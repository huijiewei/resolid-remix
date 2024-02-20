import { cp, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import { fileURLToPath } from "node:url";
import type { PackageJson } from "type-fest";
import type { Plugin, RollupCommonJSOptions } from "vite";
import { buildPackageJson, bundleServer } from "../base/build-utils";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const nodeHonoBuild = (): Plugin => {
  let root = "";
  let outDir = "";
  let ssrExternal: string[] | boolean | undefined;
  let commonjsOptions: RollupCommonJSOptions;

  // noinspection JSUnusedGlobalSymbols
  return {
    name: "vite-plugin-remix-node-hono",
    apply(config, { command }) {
      return command === "build" && !!config.build?.ssr;
    },
    enforce: "post",
    configResolved(config) {
      root = config.root || cwd();
      outDir = config.build.outDir;
      ssrExternal = config.ssr.external;
      commonjsOptions = config.build.commonjsOptions;
    },
    async closeBundle() {
      console.log("bundle Node Server for production...");

      const entryFile = "node-hono-entry.js";

      await cp(join(__dirname, entryFile), join(outDir, entryFile));

      await bundleServer(outDir, entryFile, commonjsOptions, ssrExternal);

      const distPkg = buildPackageJson(
        JSON.parse(await readFile(join(root, "package.json"), "utf8")) as PackageJson,
        ssrExternal,
      );

      await writeFile(join(outDir, "package.json"), JSON.stringify(distPkg, null, 2), "utf8");
    },
  };
};

export default nodeHonoBuild;
