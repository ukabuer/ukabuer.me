import { defineConfig } from "vite";
import prefresh from "@prefresh/vite";

export default defineConfig({
  plugins: [prefresh()],
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: `import { h, Fragment } from 'preact'`,
  },
  build: {
    sourcemap: true,
    manifest: true,
  },
});
