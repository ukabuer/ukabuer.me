import fs from "fs";
import polka from "polka";
import sirv from "sirv";
import { resolve } from "path";
import { createServer as createViteServer } from "vite";
import glob from "fast-glob";

async function createServer() {
  const app = polka();

  // static files
  app.use(sirv("./site/static"));

  // site api
  const files = await glob("./site/routes/**/api.js");
  for (const path of files) {
    let route =
      "/api" +
      path
        .replace("./site/routes", "")
        .replace("api.js", "")
        .replace(/\\/g, "/");
    const matches = route.match(/\[(\w+)\]/g);
    if (matches && matches.length > 0) {
      for (const match of matches) {
        const slug = match.substring(1, match.length - 1);
        route = route.replace(match, `:${slug}`);
      }
    }

    const script = resolve(process.cwd(), path);
    console.log(route);
    app.get(route, async (req, res) => {
      const handler = await import(script).then((m) => m.get);
      handler(req, res);
    });
  }

  const vite = await createViteServer({
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);

  app.get("/*", async (req, res) => {
    const url = req.originalUrl;
    try {
      let template = fs.readFileSync("./site/index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);

      const { renderToHtml } = await vite.ssrLoadModule(
        "./src/entry-server.tsx"
      );

      const [data, head, app] = await renderToHtml(url);

      let html = template.replace(
        "<!-- @HEAD@ -->",
        `
        ${head}
        <script>window.__PRELOAD_DATA__ = ${
          data
            ? data instanceof Error
              ? `new Error(${data.message})`
              : JSON.stringify(data)
            : "{}"
        };</script>
      `.trim()
      );
      html = html.replace(`<!-- @APP@ -->`, app);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.statusCode = 500;
      res.end(e.message);
    }
  });

  app.listen(3000, () => {
    console.log("> Running on localhost:3000");
  });
}

createServer();
