const { resolve } = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const outputPath = resolve(__dirname, 'dist');



const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
];

if (isDev) {
  plugins.push(new ReactRefreshPlugin());
} else {
  plugins.push(new MiniCssExtractPlugin());
}
module.exports = {
  entry: './src/index.tsx',
  mode: process.env.NODE_ENV,
  devtool: 'eval-cheap-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                isDev && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            }
        }]
      },
      {
        test: /\.css$/,
        use: !isDev ? [MiniCssExtractPlugin.loader, 'css-loader'] : ['style-loader', 'css-loader'],
      },
      {
        test: /\.woff(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/font-woff',
          },
        },
      },
      {
        test: /\.woff2(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/font-woff2',
          },
        },
      },
      {
        test: /\.(otf)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
      {
        test: /\.ttf(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/octet-stream',
          },
        },
      },
      {
        test: /\.svg(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[ext]',
            mimetype: 'image/svg+xml',
          },
        },
      },
      {
        test: /\.(png|jpg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      },
    ],
  },
  output: {
    path: outputPath,
    publicPath: '/',
    filename: !isDev ? 'bundle.[contenthash].js' : 'bundle.js',
  },
  devServer: {
    contentBase: outputPath,
    disableHostCheck: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
    hotOnly: false,
    compress: true,
    open: true,
    port: '4000',
  },
  plugins,
};
