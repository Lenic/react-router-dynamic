import _ from 'underscore';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { peerDependencies } from './package.json';

export default {
  input: 'src/index.js',
  external: _.keys(peerDependencies),
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
  },
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
  ]
};
