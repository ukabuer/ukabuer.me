import { hydrate } from "preact";
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

const routes: Record<string, () => any> = {};
const items = import.meta.glob("./routes/**/*.tsx");
Object.entries(items).forEach(([k, v]) => {
  routes[k] = () => v().then(module => module.default)
});

const path = window.location.pathname;
hydrate(
  <App url={path} routes={routes} />,
  document.getElementById("root") || document.body
);
