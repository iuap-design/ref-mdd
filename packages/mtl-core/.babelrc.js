const { NODE_ENV } = process.env

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['ie >= 11']
        },
        modules: false,
        loose: true
      }
    ],
    '@babel/react'
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      'corejs': false,
      'helpers': true,
      'regenerator': true,
      'useESModules': false
    }],
    ['@babel/plugin-proposal-decorators', {
      "legacy": true
    }],
    ['@babel/plugin-proposal-class-properties', {
      "loose": true
    }]
  ]
}