import path from "path";
// const __dirname = import.meta.dirname;

import { Configuration, PathData } from "webpack";
import "webpack-dev-server";

import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";

const mode: "none" | "development" | "production" =
  process.env.NODE_ENV === "development"
    ? "development"
    : (process.env.NODE_ENV as "none" | "development" | "production");
const devMode: boolean = mode === "development";
const target: "web" | "browserslist" = devMode ? "web" : "browserslist";
const devtool = "source-map";

const config: Configuration = {
  mode,
  target,
  devtool,
  entry: [path.resolve(__dirname, "../../projectName/src/index.ts")],
  output: {
    path: path.resolve(__dirname, "../../projectName/dist"),
    clean: true,
    filename: "[name].[contenthash:4].js",
    chunkFilename: "chunk.[contenthash:4].js",
    // assetModuleFilename: 'assets/[name][ext]',
    publicPath: "",
    assetModuleFilename: (pathData: PathData): string => {
      // pathData is object
      const filepathStartIndex: number = path
        // path is object
        // path.dirname('folder1/folder2/image.png') => folder1/folder2;
        .dirname(pathData.filename ? pathData.filename : "")
        // path.posix.sep === separator for path parts in current system
        .split(`${path.posix.sep}`)
        // desired folder for path start
        .indexOf("src");

      const filepath: string = path
        // pathData.filename is current full path from webpack.config.js
        .dirname(pathData.filename ? pathData.filename : "")
        // path.posix.sep === / in windows
        .split(`${path.posix.sep}`)
        .slice(filepathStartIndex)
        .join(`${path.posix.sep}`);
      return `${filepath}${path.posix.sep}[name].[hash:4][ext][query]`;
    },
  },
  devServer: {
    port: 8080,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        "../../projectName/src/pages/index.html"
      ),
      inject: "head",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:4].css",
      chunkFilename: "chunk.[contenthash:4].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, "../ts/tsconfig.json"),
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(c|sc|sa)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[name]_[hash:base64:5]",
              },
              importLoaders: 2,
            },
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
        include: /\.module\.(c|sc|sa)ss$/i,
      },
      {
        test: /\.(c|sc|sa)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /\.module\.(c|sc|sa)ss$/i,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
};

export default config;
