import { ComponentType } from "preact";
import renderToString from "preact-render-to-string";
import { createAsyncPage } from "./common/AyncPage";
import Head from "./common/Head";
import App from "./app";
import "./common/types";

const pages: Record<string, ComponentType> = {};
const items = import.meta.globEager("./routes/**/*.tsx");
Object.entries(items).forEach(([k, v]) => {
  pages[k] = createAsyncPage(() => Promise.resolve(v));
});

export async function renderToHtml(url: string) {
  if (!url.endsWith("/")) {
    url += "/";
  }
  const route = pages[`./routes${url}index.tsx`] as any;
  await route.Load();
  const data = await route.Preload();
  const app = renderToString(<App url={url} pages={pages} />);
  const head = Head.rewind()
    .map((n) => renderToString(n))
    .join("");
  return [data, head, app];
}
