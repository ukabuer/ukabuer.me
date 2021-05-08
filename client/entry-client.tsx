import { ComponentType, hydrate } from "preact";
import { createAsyncPage } from "./common/AyncPage";
import App from "./app";
import "vite/dynamic-import-polyfill";
import './common/types'

const pages: Record<string, ComponentType> = {};
const items = import.meta.glob("./routes/**/*.tsx");
Object.entries(items).forEach(([k, v]) => {
  pages[k] = createAsyncPage(() => v());
});

let path = window.location.pathname;
if (!path.endsWith("/")) {
  path += "/";
}

(pages[`./routes${path}index.tsx`] as any).Load(window.__PRELOAD_DATA__).then(() => {
  hydrate(
    <App url={path} pages={pages} />,
    document.getElementById("root") || document.body
  );
});
