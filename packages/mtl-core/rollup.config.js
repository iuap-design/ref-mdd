// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
// import json from 'rollup-plugin-json';
import pkg from './package.json'
import postcss from 'rollup-plugin-postcss';

// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
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
    // pkg.dependencies.react,
    // pkg.dependencies['rect-dom']
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    postcss({
      plugins:[
              simplevars(),
              nested(),
              cssnext({ warnForDuplicates: false, }),
              cssnano(),
             ],
      extract: true,
      extensions: [ '.css','.scss' ],
    }),
    resolve(),

    babel({
      runtimeHelpers: true,
      exclude: [
            'node_modules/**',
             '*.json'
      ],// only transpile our source code
    }),
    commonjs()
    // commonjs({
    //   namedExports: {
    //     // left-hand side can be an absolute path, a path
    //     // relative to the current directory, or the name
    //     // of a module in node_modules
    //     'node_modules/react/index.js': [ 'Component' ],
    //     'node_modules/tinper-bee/build/tinper-bee.js': [ 'FormControl', 'Button' ]
        
    //   }
    // })
    
  ]
};