import fs from "fs";
import { resolve } from "path";
import express from "express";
import { createServer as createViteServer } from "vite";
import glob from "glob";
import { promisify } from "util";

const list = promisify(glob);

async function createServer() {
  const app = express();
  app.use(express.static("./static"));

  const vite = await createViteServer({
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);
  const routes = await list(resolve(__dirname, "routes/**/index.js"));
  for (let route of routes) {
    const script = route.replace(/\//g, "\\");
    route =
      "/api" +
      script
        .replace(resolve(__dirname, "routes"), "")
        .replace("index.js", "")
        .replace(/\\/g, "/");
    const matches = route.match(/\[(\w+)\]/g);
    if (matches && matches.length > 0) {
      for (const match of matches) {
        const slug = match.substring(1, match.length - 1);
        route = route.replace(match, `:${slug}`);
      }
    }
    app.get(route, async (req, res) => {
      const handler = await import(script).then((m) => m.get);
      handler(req, res);
    });
  }

  app.use("*", async (req, res) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync("./client/index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);

      const { renderToHtml } = await vite.ssrLoadModule(
        "client/entry-server.tsx"
      );

      const [data, head, app] = await renderToHtml(url);

      let html = template.replace(
        "<!-- @HEAD@ -->",
        `
        ${head}
        <script>window.__PRELOAD_DATA__ = ${
          data ? JSON.stringify(data) : null
        };</script>
      `.trim()
      );
      html = html.replace(`<!-- @APP@ -->`, app);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(3000);
}

createServer();
