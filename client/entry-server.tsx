import { ComponentType } from "preact";
import renderToString from "preact-render-to-string";
import { createAsyncComponent } from "./common/AyncComponent";
import Head from './common/Head'
import App from './app';

const routes: Record<string, ComponentType> = {};
const items = import.meta.globEager("./routes/**/*.tsx");
Object.entries(items).forEach(([k, v]) => {
  routes[k] = createAsyncComponent(() => Promise.resolve(v))
});

export async function renderToHtml(url: string) {
  if (!url.endsWith('/')) {
    url += '/';
  }
  await (routes[`./routes${url}index.tsx`] as any).Load();
  const app = renderToString(<App url={url} routes={routes} />);
  const head = Head.rewind().map(n => renderToString(n)).join('');
  return [app, head];
}
