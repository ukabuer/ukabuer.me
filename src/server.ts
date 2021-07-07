import fs from "fs";
import sirv from "sirv";
import polka from "polka";
import glob from "fast-glob";
import { resolve } from "path";
import { createServer as createViteServer } from "vite";

async function createServer(prerender = false) {
  const app = polka();

  // static files
  app.use("/static", sirv("./site/static"));

  // site api
  const files = await glob("./site/routes/**/api.js");
  for (const path of files) {
    let route =
      "/api" +
      path
        .replace("./site/routes", "")
        .replace("api.js", "index.json")
        .replace(/\\/g, "/");
    const matches = route.match(/\[(\w+)\]/g);
    if (matches && matches.length > 0) {
      for (const match of matches) {
        const slug = match.substring(1, match.length - 1);
        route = route.replace(match, `:${slug}`);
      }
    }

    const script = resolve(process.cwd(), path);
    app.get(route, async (req, res) => {
      const originEnd = res.end.bind(res);
      let saved = "";
      res.end = (data: any) => {
        if (prerender) {
          saved = data;
        }
        originEnd(data);
      };
      const handler = await import(script).then((m) => m.get);
      await handler(req, res);

      if (prerender) {
        const url = req.originalUrl;
        const file = `exports${url}`;
        const dir = file.replace("index.json", "");
        const exists = fs.existsSync(dir);
        if (!exists) {
          fs.mkdirSync(dir);
        }
        fs.writeFileSync(file, saved);
      }
      res.end = originEnd;
    });
  }

  const vite = await createViteServer({
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);

  app.get("/*", async (req, res) => {
    const url = req.originalUrl;
    try {
      // const template = fs.readFileSync("./dist/client/index.html", "utf-8");
      let template = fs.readFileSync("site/index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);

      // const { renderToHtml } = require("../dist/server/entry-server.js"); // eslint-disable-line
      const { renderToHtml } = await vite.ssrLoadModule(
        "./src/entry-server.tsx"
      );

      const [data, head, app] = await renderToHtml(url);

      let html = template.replace(
        "<!-- @HEAD@ -->",
        head +
          `<script>window.__PRELOAD_DATA__ = ${JSON.stringify(
            data || {}
          )};</script>`.trim()
      );
      html = html.replace(`<!-- @APP@ -->`, app);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);

      if (prerender) {
        const dir = `exports${url}`;
        const exists = fs.existsSync(dir);
        if (!exists) {
          fs.mkdirSync(dir);
        }
        const file = `${dir}index.html`;
        fs.writeFileSync(file, html);
      }
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

export default createServer;
