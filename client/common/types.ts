import { ComponentType, ComponentClass } from "preact";
import { Module } from "./AyncPage";

declare global {
  interface ImportMeta {
    env: {
      SSR: boolean;
    };
    globEager: (s: string) => Record<string, Module>;
    glob: (s: string) => Record<string, () => Promise<Module>>;
  }

  interface Window {
    __PRELOAD_DATA__?: unknown;
  }
}

declare module "preact-router" {
  export function exec(url: string, path: string, opt: unknown): Record<string, string>;
}

export interface AsyncPageType extends ComponentClass<any> {
  Load(initial?: unknown): Promise<ComponentType<any> | null>;
  Preload(): Promise<unknown>;
  Match(path: string): Record<string, string>;
  Route(): string;
}
