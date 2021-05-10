import { hydrate } from "preact";
import { createAsyncPage } from "./common/AyncPage";
import App from "./app";
import { AsyncPageType } from "./common/types";
import fetch from "isomorphic-unfetch";
import "vite/dynamic-import-polyfill";

const items = import.meta.glob("./routes/**/*.tsx");
let errorPage: AsyncPageType | null = null;
const pages = Object.entries(items).map(([file, loader]) => {
  const page = createAsyncPage(file, () => loader(), fetch);
  if (file == "./routes/error.tsx") {
    errorPage = page;
  }
  return page;
});

function renderToDOM(url: string) {
  if (!url.endsWith("/")) {
    url += "/";
  }

  const page = pages.find((page) => page.Match(url)) || errorPage;
  if (!page) {
    return;
  }

  page.Load(window.__PRELOAD_DATA__).then(() => {
    hydrate(
      <App url={url} pages={pages} />,
      document.getElementById("root") || document.body
    );
  });
}

renderToDOM(window.location.pathname);
