/**
 * Webpack shared config
 * The shared loaders, plugins, and processing that all our "apps" should use for dev.
 */

const path = require('path');
const webpack = require('webpack');

const {
  PATH_SOURCE,
  PATH_PUBLIC,
} = require('./config');

const autoprefixer = require('autoprefixer');
const sassExportData = require('@theme-tools/sass-export-data')({
  name: 'export_data',
  path: path.resolve(__dirname, 'source/_data/'),
});

const StyleLintPlugin = require('stylelint-webpack-plugin');
const IconFontPlugin = require('iconfont-plugin-webpack');
const IconFontTemplate = require('./source/_patterns/01-atoms/icon/templates/iconfont-template');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, `${PATH_PUBLIC}/assets/`),
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 2 } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: () => [
                autoprefixer(),
              ],
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true, functions: sassExportData } },
        ],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(bootstrap)\/).*/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new StyleLintPlugin(),
    new IconFontPlugin({
      src: path.resolve(__dirname, PATH_SOURCE, '_patterns/01-atoms/icon/svg/'),
      family: 'iconfont',
      dest: {
        font: path.resolve(__dirname, PATH_SOURCE, '_patterns/01-atoms/icon/font/[family].[type]'),
        css: path.resolve(__dirname, PATH_SOURCE, '_patterns/01-atoms/icon/scss/_icons-generated.scss'),
      },
      watch: {
        pattern: path.resolve(__dirname, PATH_SOURCE, '_patterns/01-atoms/icon/svg/**/*.svg'),
      },
      cssTemplate: IconFontTemplate,
    }),
  ],
  resolve: {
    alias: {
      protons: path.resolve(__dirname, PATH_SOURCE, '_patterns/00-protons/'),
      atoms: path.resolve(__dirname, PATH_SOURCE, '_patterns/01-atoms/'),
      molecules: path.resolve(__dirname, PATH_SOURCE, '_patterns/02-molecules/'),
      organisms: path.resolve(__dirname, PATH_SOURCE, '_patterns/03-organisms/'),
      templates: path.resolve(__dirname, PATH_SOURCE, '_patterns/04-templates/'),
      pages: path.resolve(__dirname, PATH_SOURCE, '_patterns/05-pages/'),
    },
  },
};
