'use strict';

const path = require('path');
const webpack = require('webpack');
const env = process.env.WEBPACK_ENV;
const plugins = [];
const library = 'ReactSpawn';
const coreFileName = 'react-spawn-x'
let filename = coreFileName + '.umd.js';

plugins.push(new webpack.optimize.OccurrenceOrderPlugin());

if (env === 'build:prod') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
  filename = coreFileName + '.umd.min.js';
}

const config = {
  externals: {
    react: 'react'
  },
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: filename.toLowerCase(),
    library: library,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-0', 'react'],
              plugins: ['babel-plugin-add-module-exports']
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins
}

module.exports = config;