const webpack = require('webpack');
const helpers = require('./helpers');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
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
          use: ['css-loader', 'sass-loader']
        }),
        // use: ['style-loader', 'css-loader', 'sass-loader'],
        include: [helpers.root('src', 'styles')]
      },
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
      template: 'src/index.html'
    }),

    // Extracts global css rules and puts it into a css file, so that it can be cached
    new ExtractTextPlugin('global-[hash].css'),


  ]
};
