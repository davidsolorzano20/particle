/**
 * Pattern Lab-specific webpack config.
 * This is merged over top of webpack.particle.dev.js and uses
 * a hot-reloading server that does not generate assets inside dist/.
 */

const path = require('path');
const merge = require('webpack-merge');

const {
  PATH_PUBLIC,
} = require('../config');

const particle = require('../webpack.particle.dev');
const pl = require('./webpack.pl.shared');

const dev = {
  devServer: {
    host: 'localhost',
    port: '8080',
    contentBase: path.resolve(PATH_PUBLIC),
    watchContentBase: true,
    open: true,
    openPage: 'demo',
    hot: true,
    historyApiFallback: true,
    inline: true,
    stats: {
      colors: true,
      hash: true,
      version: true,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: true,
      children: false,
      source: true,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: true,
    },
  },
};

module.exports = merge(particle, pl, dev);
