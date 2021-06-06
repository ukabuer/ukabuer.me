import renderToString from "preact-render-to-string";
import { createAsyncPage } from "./common/AyncPage";
import Head from "./common/Head";
import App, { preloaded } from "./app";
import fetch from "isomorphic-unfetch";
import { Router } from "wouter-preact";
import staticLocationHook from "../node_modules/wouter-preact/static-location";

const items = import.meta.globEager("./routes/**/*.tsx");
const pages = Object.entries(items).map(([file, module]) => {
  const page = createAsyncPage(
    file,
    () => Promise.resolve(module),
    (url) => fetch("http://localhost:3000" + url)
  );
  return page;
});

export async function renderToHtml(url: string) {
  if (!url.endsWith("/")) {
    url += "/";
  }

  const page = pages.find((page) => page.Match(url)[0]);
  let data = null;
  if (page) {
    data = await page.Load(page.Match(url)[1]);
    preloaded[url] = data;
  }
  const app = renderToString(
    <Router hook={staticLocationHook(url)}>
      <App pages={pages} />
    </Router>
  );
  const head = Head.rewind()
    .map((n) => renderToString(n))
    .join("");
  return [data, head, app];
}
