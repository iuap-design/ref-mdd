// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

import pkg from './package.json'

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/mtl-core.js',
    format: 'umd',
    name: 'MTLCore',
    globals: {
      react: 'React',
      axios: 'axios',
      'mini-store': 'miniStore',
      'tinper-bee': 'TinperBee'
    }
  },
  external: [
    pkg.dependencies.react,
    pkg.dependencies['rect-dom']
    // ...Object.keys(pkg.dependencies || {}),
    // ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    resolve(),

    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**' // only transpile our source code
    }),
    json(),
    commonjs({
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        'node_modules/react/index.js': [ 'Component' ],
        'node_modules/tinper-bee/build/tinper-bee.js': [ 'FormControl', 'Button' ]
        
      }
    })
    
  ]
};