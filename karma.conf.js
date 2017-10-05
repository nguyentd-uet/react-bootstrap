const { plugins, rules } = require('webpack-atoms');


module.exports = (config) => {
  const { env } = process;

  config.set({
    frameworks: ['mocha', 'sinon-chai'],

    files: ['test/index.js'],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      devtool: 'module-source-map',
      module: {
        rules: [
          rules.js({ cacheDirectory: true }),
        ],
      },
      plugins: [
        plugins.define({
          'process.env.NODE_ENV': JSON.stringify('test'),
        }),
      ],
    },

    webpackMiddleware: {
      noInfo: true,
    },

    reporters: ['mocha', 'coverage'],

    mochaReporter: {
      output: 'autowatch',
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage',
    },

    customLaunchers: {
      ChromeCi: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },

    browsers: env.BROWSER ? env.BROWSER.split(',') : ['Chrome'],

    singleRun: env.CONTINUOUS_INTEGRATION === 'true',
  });
};
