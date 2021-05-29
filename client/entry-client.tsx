import { hydrate } from "preact";
import { createAsyncPage } from "./common/AyncPage";
import App from "./app";
import fetch from "isomorphic-unfetch";
import { Router } from "wouter-preact";

const items = import.meta.glob("./routes/**/*.tsx");
const pages = Object.entries(items).map(([file, loader]) => {
  const page = createAsyncPage(file, () => loader(), fetch);
  return page;
});

function renderToDOM(url: string) {
  if (!url.endsWith("/")) {
    url += "/";
  }

  const page = pages.find((page) => page.Match(url));
  let preload = Promise.resolve(null as any);
  if (page) {
    preload = page.Load(window.__PRELOAD_DATA__);
  }

  preload.then(() => {
    hydrate(
      <Router><App pages={pages} /></Router>,
      document.getElementById("root") || document.body
    );
  });
}

renderToDOM(window.location.pathname);
