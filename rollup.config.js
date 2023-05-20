const commonjs = require('@rollup/plugin-commonjs');
const resolve = require("@rollup/plugin-node-resolve");
const Json = require('@rollup/plugin-json');
const PKG_JSON = require("./package.json");

const external = [
  ...Object.keys(PKG_JSON.devDependencies || {}),
  ...Object.keys(PKG_JSON.peerDependencies || {}),
];

module.exports = {
  input: "src/index.js",
  output: [
    {
      format: "cjs",
      file: "dist/index.js",
      exports: "auto",
      sourcemap: true,
      name: PKG_JSON.name,
    },
  ],
  plugins: [
    Json(),
    resolve(),
    commonjs(),
  ],
  external,
};
