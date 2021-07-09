import pkg from './package.json'
import babel from '@rollup/plugin-babel';
import css from "rollup-plugin-import-css";

export default {
  input: 'src/components/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [css(), babel({ babelHelpers: 'bundled' })],
  external: ['react', 'react-dom']
}
