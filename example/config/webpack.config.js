var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function getPath(dir) {
  return path.join(process.cwd(), dir);
}

module.exports = {
  mode: 'development',
  devtool: false,
  entry: getPath('example/src/index.js'),
  output: {
    publicPath: '/',
    filename: 'js/[name].js',
    path: getPath('example/dist'),
    chunkFilename: 'js/chunks/[id].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@lenic/react-router-dynamic': getPath('lib'),
    },
  },
  plugins: [
    new webpack.NamedChunksPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
    new HtmlWebpackPlugin({
      title: 'Dynamic React Router Demo',
      template: getPath('example/config/index.html'),
    }),
  ],
};
