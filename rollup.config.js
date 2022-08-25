import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonJS from "@rollup/plugin-commonjs";

export default {
  input: "./src/index.ts",
  output: [{
    format: "cjs",
    file: "./dist/index.cjs",
    externalLiveBindings: false
  }, {
    format: "es",
    file: "./dist/index.js",
    externalLiveBindings: false
  }],
  plugins: [
    nodeResolve(),
    commonJS(),
    typescript({
      include: ["src/*.ts"]
    })
  ]
}