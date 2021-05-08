import { Module } from "./AyncPage";

declare global {
  interface ImportMeta {
    env: {
      SSR: boolean;
    };
    globEager: (s: string) => Record<string, Module>;
    glob: (s: string) => Record<string, () => Promise<Module>>;
  }

  interface Window { __PRELOAD_DATA__?: unknown }
}
