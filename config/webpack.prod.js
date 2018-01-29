const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const AotNgw = require('@ngtools/webpack'); // (used by AOT

// Webpack constants
// --------------------
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const METADATA = {
  ENV: ENV
};
// ----------------------------------------------------

// AOT constants & plugins
// --------------------
const AOT = (process.env.AOT === 'ENABLED') ;
const AOTplugins = [];
if (AOT) {
  AOTplugins.push(
    new AotNgw.AngularCompilerPlugin({
      tsConfigPath: './tsconfig.aot.json',
      entryModule: './src/app/app.module#AppModule'
    })
  )
}
// ----------------------------------------------------

module.exports = webpackMerge(commonConfig, {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': AOT ? './src/main.aot.ts' : './src/main.ts'
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },

  devtool: 'source-map',

  module: {
    rules: [
      // This was added to allow AOT (works  without it - DEPRECATED)
      // --------------------
      // {
      //   test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
      //   loader: '@ngtools/webpack'
      // },
      // ----------------------------------------------------
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: AOT ? helpers.root('tsconfig.aot.json') : helpers.root('tsconfig.json')}
          },
          'angular2-template-loader' // angular2-template-loader -> loads angular components' template and styles (styleUrls / templateUrls)
        ]
      },
      // This was added to allow AOT (works  without it - DEPRECATED)
      // --------------------
      // {
      //   test: /\.(ts|js)$/,
      //   loaders: [
      //     'angular-router-loader?aot=true'
      //   ]
      // },
      // ----------------------------------------------------
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
          { loader: 'css-loader', options: { importLoaders: 1, minimize: true } },
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
            { loader: 'css-loader', options: { importLoaders: 1, minimize: true } },
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
    ...AOTplugins, // if AOT === true, its adds AOT plugins

    new OptimizeJsPlugin({
      sourceMap: false
    }),

    /**
     * Plugin: UglifyJsPlugin
     * Description: Minimize all JavaScript output of chunks.
     * Loaders are switched into minimizing mode.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     *
     * NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
     */
    new UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      // beautify: true, //debug
      // mangle: false, //debug
      // dead_code: false, //debug
      // unused: false, //debug
      // deadCode: false, //debug
      // compress: {
      //   screw_ie8: true,
      //   keep_fnames: true,
      //   drop_debugger: false,
      //   dead_code: false,
      //   unused: false
      // }, // debug
      // comments: true, //debug

      beautify: false, //prod
      output: {
        comments: false
      }, //prod
      mangle: {
        screw_ie8: true
      }, //prod
      compress: {
        drop_console: false,
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      }
    }),

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
  ]
});