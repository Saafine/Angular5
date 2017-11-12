const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

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
          } , 'angular2-template-loader' // angular2-template-loader -> loads angular components' template and styles (styleUrls / templateUrls)
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },

      // the first css pattern matches application-wide styles
      // {
      //   test: /\.css$/,
      //   exclude: helpers.root('src', 'app'), // the component-scoped styles sit here, so they must be excluded
      //   loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
      // },
      //
      // // the second css patern handles component-scoped styles (the ones specified in a component's styleUrls metadata property).
      // {
      //   test: /\.css$/,
      //   include: helpers.root('src', 'app'),
      //   loader: 'raw-loader'
      // }
    ]
  },

  // creates instances of the plugins
  plugins: [
    // !todo remove ?
    // Workaround for angular/angular#11580
    // new webpack.ContextReplacementPlugin(
    //   // The (\\|\/) piece accounts for path separators in *nix and Windows
    //   /angular(\\|\/)core(\\|\/)@angular/,
    //   helpers.root('./src'), // location of your src
    //   {} // a map of your routes
    // ),

    // Create multiple chunks
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
