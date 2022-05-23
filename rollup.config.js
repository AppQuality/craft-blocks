import pkg from "./package.json";
import babel from "@rollup/plugin-babel";
import styles from "rollup-plugin-styles";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "src/components/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
        sourcemap: true,
        strict: false
      }
    ],
    plugins: [
      commonjs(),
      babel({ babelHelpers: "bundled" }),
      styles({
        modules: true
      }),
      typescript()
    ],
    external: ["react", "react-dom", "@appquality/appquality-design-system"]
  }
];