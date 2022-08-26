import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonJS from "@rollup/plugin-commonjs";

import pkg from "./package.json";

export default {
  input: "./src/index.ts",
  output: [
    { format: "cjs", file: pkg.main },
    { format: "esm", file: pkg.module },
  ],
  external: [...Object.keys(pkg.dependencies)],
  plugins: [
    nodeResolve(),
    commonJS(),
    typescript({
      include: ["src/*.ts"],
    }),
  ],
};
