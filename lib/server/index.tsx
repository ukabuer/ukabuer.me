import render from "preact-render-to-string";
import fs from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { FunctionComponent } from "preact";

async function getAllRoutes(dir: string): Promise<string[]> {
  const paths = await fs.readdir(dir);

  const tasks = paths.map(async (path) => {
    const absolutePath = resolve(dir, path);
    const stat = await fs.stat(resolve(dir, path));
    if (stat.isFile()) {
      if (absolutePath.endsWith(".js")) {
        return [absolutePath];
      } else {
        return [];
      }
    }

    return getAllRoutes(absolutePath);
  });

  const result = await Promise.all(tasks);
  let routes: string[] = [];
  result.forEach((item) => (routes = routes.concat(item)));
  return routes;
}

async function renderToHtml(routesDir: string): Promise<string[]> {
  const routes = await getAllRoutes(routesDir);
  const tasks = routes.map(async (route) => {
    const moudle = await import(pathToFileURL(route).toString());
    const Page = moudle.default as FunctionComponent;
    const html = render(<Page />);
    return html;
  });

  const pages = await Promise.all(tasks);
  return pages;
}

const routesDir = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../routes"
);
const htmls = await renderToHtml(routesDir);
console.log(htmls);
