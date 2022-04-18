const path = require("path");
const HTMLWebpackplugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const fileName = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: path.resolve(__dirname, "src/js", "index.js"),
  output: {
    filename: `./js/${fileName("js")}`,
    path: path.resolve(__dirname, "app"),
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, "app"),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [
    new HTMLWebpackplugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${fileName("css")}`,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: path.resolve(__dirname, "src/assets"), to: path.resolve(__dirname, "app")},
    //   ],
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: { esModule: false },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
        loader: "file-loader",
        options: {
          name: `./img/${fileName("[ext]")}`,
        },
      },
    ],
  },
};
