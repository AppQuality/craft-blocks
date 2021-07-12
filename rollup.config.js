import pkg from "./package.json";
import babel from "@rollup/plugin-babel";
import styles from "rollup-plugin-styles";

export default [
  {
    input: "src/components/index.js",
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
      babel({ babelHelpers: "bundled" }),
      styles({
        modules: true
      })
    ],
    external: ["react", "react-dom", "@appquality/appquality-design-system"]
  }
];
