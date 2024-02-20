import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import { rm } from "node:fs/promises";
import { join } from "node:path";
import { rollup } from "rollup";
import type { PackageJson } from "type-fest";
import type { RollupCommonJSOptions } from "vite";

const parseSsrExternal = (ssrExternal: string[] | boolean | undefined): string[] => {
  if (Array.isArray(ssrExternal)) {
    return ssrExternal;
  }

  return [];
};

export const buildPackageJson = (pkg: PackageJson, ssrExternal: string[] | boolean | undefined): PackageJson => {
  const parsedSsrExternal = parseSsrExternal(ssrExternal);

  return {
    name: pkg.name,
    type: pkg.type,
    scripts: {
      postinstall: pkg.scripts?.postinstall ?? "",
    },
    dependencies: {
      ...Object.keys(pkg.dependencies ?? {})
        .filter((key) => parsedSsrExternal.includes(key))
        .reduce((obj: Record<string, string>, key) => {
          obj[key] = pkg.dependencies?.[key] ?? "";

          return obj;
        }, {}),
      ...Object.keys(pkg.devDependencies ?? {})
        .filter((key) => parsedSsrExternal.includes(key))
        .reduce((obj: Record<string, string>, key) => {
          obj[key] = pkg.devDependencies?.[key] ?? "";

          return obj;
        }, {}),
    },
  } as PackageJson;
};

export const bundleServer = async (
  outDir: string,
  entryFile: string,
  commonjsOptions: RollupCommonJSOptions,
  ssrExternal: string[] | boolean | undefined,
) => {
  const inputEntry = join(outDir, entryFile);

  const bundle = await rollup({
    input: inputEntry,
    plugins: [
      json(),
      nodeResolve({
        preferBuiltins: true,
        exportConditions: ["node"],
        dedupe: ["react", "react-dom", "@remix-run/react"],
      }),
      commonjs({ ...commonjsOptions, strictRequires: true }),
    ],
    external: parseSsrExternal(ssrExternal),
    logLevel: "silent",
  });

  const bundleFile = join(outDir, "serve.mjs");

  await bundle.write({
    format: "esm",
    file: bundleFile,
    inlineDynamicImports: true,
  });

  await bundle.close();

  await rm(inputEntry);

  return bundleFile;
};
