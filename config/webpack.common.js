const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // copy static assets
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DefinePlugin = require('webpack/lib/DefinePlugin');

/**
 * Constants from app config will be transformed into global variables
 */
const app_config = require('../app_config');

module.exports = {
  // how to resolve file names when they lack extensions
  resolve: {
    extensions: ['.ts', '.js']
  },

  // module is an object with rules for deciding how files are loaded
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      }
    ]
  },

  // creates instances of the plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: helpers.packageSort(['polyfills', 'vendor', 'app'])
    }),

    // Copy statics assets
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' }]
    ),

    // Extracts global css rules and puts it into a css file, so that it can be cached
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Group common groups of code into 1 file
    new CommonsChunkPlugin({
      name: 'commons',
      chunks: ['app', 'vendor'],
      filename: 'commons.[chunkhash].js',
      minChunks: 2
    }),

    new DefinePlugin({
      'APP_VERSION': JSON.stringify(app_config.APP_VERSION),
      'APP_NAME': JSON.stringify(app_config.APP_NAME),
      'TARGET_MACHINE': JSON.stringify(process.env.TARGET_MACHINE),
    }),

    // Uncomment this to analyze bundle size
    // --------------------
    // new BundleAnalyzerPlugin()
    // ----------------------------------------------------
  ]
};
