const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new htmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html'
});

module.exports = env => {
  return {
    entry: './src/client/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    devServer: {
      port: 3000,
      proxy: {
        '/': 'http://localhost:3001/'
      }
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json']
    },
    devtool: 'source-map',
    mode: env.mode,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          enforce: 'pre',
          use: 'source-map-loader'
        },
        {
          test: /\.(png|jpg|jpeg|ico|woff)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: "./assets/[name].[ext]",
                publicPath: '../'
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|jpeg|ico|woff)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 25000
              }
            }
          ]
        }
      ]
    },
    plugins: [htmlPlugin]
  };
};
