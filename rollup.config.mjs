import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import analyze from "rollup-plugin-analyzer";
import babel from "@rollup/plugin-babel";
import del from "rollup-plugin-delete";
import json from "@rollup/plugin-json";

import packageJson from "./package.json" assert { type: "json", integrity: "sha384-ABC123" };
import { externals } from "rollup-plugin-node-externals";

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
  ],

  plugins: [
    del({ targets: "build/*" }),
    externals({
      include: true,
    }),
    // devDependenciesnd and peerDependencies wont be included in the bundle
    // if you want to also exculde dependencies, change deps to true
    resolve(),
    typescript({ useTsconfigDeclarationDir: true }),
    babel({
      babelHelpers: "runtime",
      exclude: "**/node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    postcss(),
    analyze(),
    json(),
  ],
};
