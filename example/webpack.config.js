const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SkeletonScreenPlugin } = require('../src/index');

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, 'src/index.ts'),
  output: {
    path: resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  devServer: {
    static: [resolve(__dirname, 'dist')],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './public/index.html'),
    }),
    new SkeletonScreenPlugin({
      // 打包生成后的静态目录
      dir: resolve(__dirname, './dist'),
      port: 9000,
      origin: 'http://localhost:9000'
    }),
  ],
};
