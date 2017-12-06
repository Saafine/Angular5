const webpack = require('webpack');
const helpers = require('./helpers');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // copy static assets
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  // the entry-point files that define the bundles
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  // how to resolve file names when they lack extensions
  resolve: {
    extensions: ['.ts', '.js']
  },

  // module is an object with rules for deciding how files are loaded
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          },
          'angular2-template-loader', // angular2-template-loader -> loads angular components' template and styles (styleUrls / templateUrls)
          'angular-router-loader' // handle lazy loaded routes
        ]
      },
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
    // This fixes 'Critical dependency: the request of a dependency is an expression' error on compilation
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core/,
      path.resolve(__dirname, '../src')
    ),

    // Create multiple chunks
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['app', 'vendor', 'polyfills'],
    // }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: helpers.packageSort(['polyfills', 'vendor', 'app'])
    }),

    // Extracts global css rules and puts it into a css file, so that it can be cached
    new ExtractTextPlugin('[name].[contenthash].css'),


    // Copy statics assets
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' }]
    ),

    // new BundleAnalyzerPlugin(),

    new CommonsChunkPlugin({
      name: "abc",
      chunks: ["app" ,'vendor'],
      filename: 'commons.[chunkhash].js',
      minChunks: 2
    })

  ]
};
