import renderToString from "preact-render-to-string";
import { createAsyncPage } from "./common/AyncPage";
import Head from "./common/Head";
import App from "./app";
import { AsyncPageType } from "./common/types";
import fetch from "isomorphic-unfetch";

const items = import.meta.globEager("./routes/**/*.tsx");
let errorPage: AsyncPageType | null = null;
const pages = Object.entries(items).map(([file, module]) => {
  const page = createAsyncPage(file, () => Promise.resolve(module), fetch);
  if (file == "./routes/error.tsx") {
    errorPage = page;
  }
  return page;
});

export async function renderToHtml(url: string) {
  if (!url.endsWith("/")) {
    url += "/";
  }

  let page = pages.find((page) => page.Match(url)) || errorPage;
  if (!page) {
    page = errorPage;
  }

  if (!page) {
    return ["", "", "Not Found"];
  }

  await page.Load();
  const data = await page.Preload();
  const app = renderToString(<App url={url} pages={pages} />);
  const head = Head.rewind()
    .map((n) => renderToString(n))
    .join("");
  return [data, head, app];
}
