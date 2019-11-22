const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

var SRC_DIR = path.join(__dirname, '/client/index.jsx');
var DIST_DIR = path.join(__dirname, '/public/');

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: SRC_DIR,
    output: {
      path: DIST_DIR,
      filename: 'bundle.js'
    },
    plugins: [new webpack.DefinePlugin(envKeys)],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },

        {
          test: /\.jsx$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        }
      ]
    },
    mode: 'development'
  };
};
