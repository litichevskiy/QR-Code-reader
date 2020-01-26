const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const NODE_ENV = process.env.NODE_ENV || "development";
const IS_PRODUCTION = NODE_ENV === "production";

module.exports = [
  {
    entry: ['./src/js/sw.js'],
    output: {
      path: path.resolve(__dirname, './dist/js'),
      filename: 'sw.js',
    },
    plugins:[],
    watch: !IS_PRODUCTION,
  },
  {
    entry: {
      bundle: ['./src/js/index.js'],
      css: ['./src/style/index.scss']
    },
    output: {
      path: path.resolve(__dirname, './dist/js'),
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
    },
    resolve: {
      extensions: [' ', '.js', '.scss', 'css'],
    },
    plugins: [
      new ExtractTextPlugin('../css/bundle.css'),
      new webpack.DefinePlugin ({
        'process.env.NODE_ENV': JSON.stringify ( NODE_ENV )
      })
    ],
    devtool: IS_PRODUCTION ? 'none' : 'source-map',
    watch: !IS_PRODUCTION,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /\/node_modules\//,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ["@babel/preset-env"]
              }
          }
        },
        {
          exclude: /\/node_modules\//,
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {sourceMap: !IS_PRODUCTION, minimize:  IS_PRODUCTION}
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [autoprefixer({browsers:['last 5 version']})],
                  sourceMap: !IS_PRODUCTION
                }
              },
              {
                loader: 'sass-loader',
                options: {sourceMap: !IS_PRODUCTION}
              }
            ]
          })
        }
      ]
    }
  }
];

if( IS_PRODUCTION ) {
  module.exports.forEach( item => {
    item.plugins.push( new UglifyJsPlugin({ uglifyOptions: { minimize: true }}) );
  });
};