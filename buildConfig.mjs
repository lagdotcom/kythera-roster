/*eslint-env node*/

import CDNModule from "./CDNModule.mjs";

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
    plugins: [CDNModule],
    loader: {
      ".json": "file",
      ".ogg": "file",
      ".png": "file",
      ".svg": "file",
    },
    ...options,
  };
}
