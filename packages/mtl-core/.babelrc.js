const { NODE_ENV } = process.env

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['ie >= 11']
        },
        loose: true
      }
    ],
    '@babel/react'
  ],
  plugins:[
    '@babel/plugin-proposal-class-properties',
    "@babel/plugin-transform-async-to-generator",
    // "@babel/plugin-transform-runtime"
    ["@babel/plugin-transform-runtime", {
        "helpers": false,
        "polyfill": false,
        "regenerator": true,
        "moduleName": "babel-runtime"
      }
    ]
  ]
}