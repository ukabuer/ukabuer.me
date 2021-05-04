import { ComponentType, hydrate } from "preact";
import { createAsyncComponent } from "./common/AyncComponent";
import App from "./app";
import "vite/dynamic-import-polyfill";

declare global {
  interface ImportMeta {
    env: {
      SSR: boolean;
    };
    globEager: (s: string) => Record<string, any>;
    glob: (s: string) => Record<string, () => Promise<any>>;
  }
}

const routes: Record<string, ComponentType> = {};
const items = import.meta.glob("./routes/**/*.tsx");
Object.entries(items).forEach(([k, v]) => {
  routes[k] = createAsyncComponent(() => v());
});

let path = window.location.pathname;
if (!path.endsWith('/')) {
  path += '/';
}
(routes[`./routes${path}index.tsx`] as any).Load().then(() => {
  hydrate(
    <App url={path} routes={routes} />,
    document.getElementById("root") || document.body
    );
  })
