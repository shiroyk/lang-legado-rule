import { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

import pkg from "./package.json";

const options: RollupOptions = {
  input: "./src/index.ts",
  output: [
    { format: "esm", file: pkg.main }
  ],
  external: [...Object.keys(pkg.dependencies)],
  plugins: [
    nodeResolve(),
    typescript({
      include: ["src/*.ts"],
    }),
  ],
}

export default options