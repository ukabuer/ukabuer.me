import renderToString from "preact-render-to-string";
import App from './app';

const routes: Record<string, () => any> = {};
const items = import.meta.globEager("./routes/**/*.tsx");
Object.entries(items).forEach(([k, v]) => {
  routes[k] = () => v.default
});

export function renderToHtml(url: string) {
  return renderToString(<App url={url} routes={routes} />);
}
