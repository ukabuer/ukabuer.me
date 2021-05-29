import renderToString from "preact-render-to-string";
import { createAsyncPage } from "./common/AyncPage";
import Head from "./common/Head";
import App from "./app";
import fetch from "isomorphic-unfetch";
import { Router } from "wouter-preact";
import staticLocationHook from "wouter-preact/cjs/static-location";

const items = import.meta.globEager("./routes/**/*.tsx");
const pages = Object.entries(items).map(([file, module]) => {
  const page = createAsyncPage(file, () => Promise.resolve(module), fetch);
  return page;
});

export async function renderToHtml(url: string) {
  if (!url.endsWith("/")) {
    url += "/";
  }

  const page = pages.find((page) => page.Match(url));
  let data = null;
  if (page) {
    await page.Load();
    data = await page.Preload();
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
