import glob from "fast-glob";
import fetch from "isomorphic-unfetch";
import { isMainThread, Worker, parentPort } from "worker_threads";
import createServer from "./server";
import * as vite from "vite";
import { resolve } from "path";
import fs from "fs";

export async function prerender() {
  const pages = await glob("site/routes/**/*.tsx");
  const apis = await glob("site/routes/**/.ts");
  const urls = pages
    .concat(apis)
    .filter((url) => !url.match(/\[\w+\]/))
    .map((url) =>
      url.replace(".tsx", "").replace("/index", "/").replace("site/routes", "")
    );

  // start server with rendering mode
  const unresolved = [...urls];
  const resolved = new Set();

  while (unresolved.length > 0) {
    const url = unresolved.shift();
    if (!url || resolved.has(url)) {
      continue;
    }

    // request url & get response
    const target = `http://localhost:3000${url}`;
    const response = await fetch(target);
    if (response.status != 200) {
      continue;
    }

    const text = await response.text();

    // save to file
    const type = response.headers.get("Content-Type") || "";
    if (type.match("text/html")) {
      // parse to find more url
    }

    resolved.add(url);
  }
}

async function startServerAndPrerender() {
  await vite.build({
    configFile: false,
    root: resolve(__dirname, "../site"),
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsxInject: `import { h, Fragment } from 'preact'`,
    },
    build: {
      emptyOutDir: true,
      ssr: resolve(__dirname, "./entry-server.tsx"),
      ssrManifest: true,
      outDir: "./dist/server",
      manifest: true,
    },
  });

  await vite.build({
    configFile: false,
    root: resolve(__dirname, "../site"),
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsxInject: `import { h, Fragment } from 'preact'`,
    },
    build: {
      emptyOutDir: false,
      outDir: "./dist",
      manifest: true,
    },
  });

  fs.copyFileSync(
    resolve(__dirname, "../site/dist/index.html"),
    resolve(__dirname, "../site/dist/server/template.html")
  );

  fs.rmSync(resolve(__dirname, "../site/dist/index.html"));

  const app = await createServer(true);
  const worker = new Worker(__filename);
  worker.on("error", (err) => {
    console.error(err.message);
  });
  worker.on("message", () => {
    console.log("prerendered!");
    fs.rmdirSync(resolve(__dirname, "../site/dist/server/"), { recursive: true });
    app.server.close();
  });
  worker.on("exit", () => {
    process.exit();
  });
}

if (isMainThread) {
  startServerAndPrerender();
} else {
  prerender().then(() => {
    parentPort?.postMessage(null);
  });
}
