/*eslint-env node*/

import alias from "esbuild-plugin-alias";
import path from "path";
import { fileURLToPath } from "url";

import CDNModule from "./CDNModule.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const preact = (subPath) => path.join(root, "node_modules/preact", subPath);

/**
 * @param {import('esbuild').BuildOptions} [options={}] custom options
 * @returns {import('esbuild').BuildOptions} combined options
 */
export default function getBuildConfig(options = {}) {
  return {
    entryPoints: ["src/index.tsx"],
    bundle: true,
    outfile: "docs/bundle.js",
    target: "es2016",
    define: {
      [`process.env.APP_BUILD_VERSION`]: JSON.stringify(
        process.env.npm_package_version
      ),
    },
    plugins: [
      CDNModule,
      alias({
        react: preact("compat/src/index.js"),
        "react-dom/test-utils": preact("compat/src/test-utils.js"),
        "react-dom": preact("compat/src/index.js"),
        "react/jsx-runtime": preact("compat/src/jsx-runtime.js"),
      }),
    ],
    loader: {
      ".json": "file",
      ".ogg": "file",
      ".png": "file",
      ".svg": "file",
    },
    ...options,
  };
}
