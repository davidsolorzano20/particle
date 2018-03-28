/**
 * Drupal-specific webpack config common to dev and prod.
 */

const path = require('path');
const webpack = require('webpack');

const drupal = {
  entry: {
    'app-drupal': [
      path.resolve(__dirname, 'index.js'),
    ],
  },
  externals: {
    jquery: 'jQuery',
    lodash: '_',
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('drupal'),
    }),
  ],
};

module.exports = drupal;
