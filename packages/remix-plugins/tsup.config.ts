import { defineConfig, type Options } from "tsup";
import { dependencies, devDependencies, peerDependencies } from "./package.json";

const baseConfig: Options = {
  format: ["esm"],
  noExternal: Object.keys(dependencies),
  platform: "node",
  target: "node20",
  dts: true,
  treeshake: true,
  clean: true,
};

export default defineConfig([
  {
    ...baseConfig,
    entry: {
      "flex-routes": "src/flex-routes/index.ts",
    },
    external: [...Object.keys(peerDependencies), ...Object.keys(devDependencies)],
  },
  {
    ...baseConfig,
    entry: {
      "node-hono": "src/node-hono/plugin.ts",
    },
    external: [...Object.keys(peerDependencies), ...Object.keys(devDependencies)],
  },
  {
    ...baseConfig,
    entry: {
      "node-hono-entry": "src/node-hono/entry.ts",
    },
    external: [...Object.keys(peerDependencies), ...Object.keys(devDependencies), "./index.js"],
  },
  {
    ...baseConfig,
    entry: {
      "vercel-serverless": "src/vercel-serverless/plugin.ts",
    },
    external: [...Object.keys(peerDependencies), ...Object.keys(devDependencies)],
  },
  {
    ...baseConfig,
    entry: {
      "vercel-serverless-entry": "src/vercel-serverless/entry.ts",
    },
    external: [...Object.keys(peerDependencies), ...Object.keys(devDependencies), "./index.js"],
  },
]);
