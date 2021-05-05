const fs = require("fs");
const path = require("path");
const express = require("express");
const { createServer: createViteServer } = require("vite");

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);

  app.use("*", async (req, res) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, "../index.html"),
        "utf-8"
      );
      template = await vite.transformIndexHtml(url, template);

      const { renderToHtml } = await vite.ssrLoadModule("src/entry-server.tsx");

      const [app, head] = await renderToHtml(url);

      let html = template.replace('<!-- @HEAD@ -->', `
        ${head}
        <script>window.SSR_URL = "${url}";</script>
      `.trim());
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
