const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

// Webpack constants
// --------------------
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8000;
const PUBLIC = process.env.PUBLIC_DEV || HOST + ':' + PORT;
const METADATA = {
  host: HOST,
  port: PORT,
  public: PUBLIC,
  ENV: ENV
};
// ----------------------------------------------------

module.exports = webpackMerge(commonConfig, {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('tsconfig.json'), transpileOnly: true } // ! transpileOnly was added for AOT, but it may be not needed
          },
          'angular2-template-loader', // angular2-template-loader -> loads angular components' template and styles (styleUrls / templateUrls)
          'angular-router-loader' // handle lazy loaded routes
        ]
      },
      /**
       * To string and scs/css loader support for *.css / *.scss files (from Angular components)
       * Returns file content as string
       *
       */
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
        exclude: [helpers.root('src', 'styles')]
      },
      {
        test: /\.scss$/,
        use: [
          'to-string-loader',
          { loader: 'css-loader', options: { importLoaders: 1, minimize: false } },
          {
            loader: 'postcss-loader',
            options: { config: { path: './config/postcss.config.js' } }
          },
          'sass-loader'],
        exclude: [helpers.root('src', 'styles')]
      },

      /**
       * Css and SCSS loader support for *.css / *.scss files (styles directory only)
       * Loads external css styles into the DOM, supports HMR
       *
       */
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [helpers.root('src', 'styles')]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1, minimize: false } },
            {
              loader: 'postcss-loader', options: {
                config: { path: './config/postcss.config.js' }
              }
            },
            'sass-loader'
          ]
        }),
        // use: ['style-loader', 'css-loader', 'sass-loader'], // without extract text plugin
        include: [helpers.root('src', 'styles')]
      }
    ]
  },

  plugins: [
    // WARNING: IF AOT IS ON, THIS WILL BREAK APPLICATION !
    // This fixes 'Critical dependency: the request of a dependency is an expression' error on compilation in console
    // --------------------
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core/,
      path.resolve(__dirname, '../src')
    ),
    // ----------------------------------------------------
    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global constants.
     *
     * Environment helpers
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     *
     * NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
     */
    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'process.env.ENV': JSON.stringify(METADATA.ENV),
      'process.env.NODE_ENV': JSON.stringify(METADATA.ENV)
    })
  ],

  //  The dev server keeps all bundles in memory; it doesn't write them to disk
  devServer: {
    port: METADATA.port,
    host: METADATA.host,
    public: METADATA.public,
    historyApiFallback: true,
    watchOptions: {
      // if you're using Docker you may need this
      // aggregateTimeout: 300,
      // poll: 1000,
      ignored: /node_modules/
    }
  }
});