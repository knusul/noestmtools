module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        files: [
            { pattern: 'test-context.js', watched: false }
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'test-context.js': ['webpack']
        },
        webpack: {
            module: {
              loaders: [
                {
                  test: /\.json$/,
                  loader: 'json-loader'
                },
                { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
              ]
              },
              watch: true,
              externals:
              {
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
              }
              },
        webpackServer: {
            noInfo: true
        }
    });
};
