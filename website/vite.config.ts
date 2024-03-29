import { unstable_vitePlugin as remix } from "@remix-run/dev";
import remixFlexRoutes from "@resolid/remix-plugins/flex-routes";
import nodeHonoBuild from "@resolid/remix-plugins/node-hono";
import vercelServerlessBuild from "@resolid/remix-plugins/vercel-serverless";
import { resolve } from "node:path";
import { env } from "node:process";
import { defineConfig, splitVendorChunkPlugin, type AliasOptions, type UserConfig } from "vite";
import viteInspect from "vite-plugin-inspect";
import tsconfigPaths from "vite-tsconfig-paths";

const appDirectory = "src";

export default defineConfig(({ command }) => {
  const isBuild = command == "build";
  const buildEnv = env.BUILD_ENV;

  const config: UserConfig = {
    plugins: [
      remix({
        appDirectory: appDirectory,
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
        ignoredRouteFiles: ["**/*"],
        routes: async () => {
          return await remixFlexRoutes({
            appDir: appDirectory,
            ignoredRouteFiles: ["**/.*", "**/__*.*", "**/*.demo.tsx"],
          });
        },
      }),
      splitVendorChunkPlugin(),
      !isBuild && tsconfigPaths(),
      !isBuild && viteInspect(),
      isBuild && !buildEnv && nodeHonoBuild(),
      isBuild &&
        buildEnv == "vercel" &&
        vercelServerlessBuild({
          regions: "sin1",
          cleanUrls: true,
          cacheFiles: ["favicon.svg", "apple-touch-icon.png", "manifest.webmanifest"],
          cacheFolders: ["icons", "images"],
        }),
    ].filter(Boolean),
    build: {
      minify: true,
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (warning.code === "MODULE_LEVEL_DIRECTIVE" && warning.message.includes("use client")) {
            return;
          }
          defaultHandler(warning);
        },
        output: {
          manualChunks(id) {
            if (
              id.includes("/node_modules/react/") ||
              id.includes("/node_modules/react-dom/") ||
              id.includes("/node_modules/react-is/") ||
              id.includes("/node_modules/scheduler/") ||
              id.includes("/node_modules/prop-types/")
            ) {
              return "react";
            }

            if (id.includes("/node_modules/")) {
              return "vendor";
            }

            if (id.includes("/node_modules/@resolid/") || id.includes("/packages/")) {
              return "resolid";
            }
          },
        },
      },
    },
    resolve: {
      alias: [isBuild && { find: "~", replacement: resolve(__dirname, `./${appDirectory}`) }].filter(
        Boolean,
      ) as AliasOptions,
    },
    optimizeDeps: {
      holdUntilCrawlEnd: false,
    },
  };

  return config;
});
