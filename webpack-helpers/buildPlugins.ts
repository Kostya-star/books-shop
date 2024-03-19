import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import { ProgressPlugin } from 'webpack';

export function buildPlugins(path: string, isDev: boolean) {
  return [
    new HtmlWebpackPlugin({ template: path }),
    new VueLoaderPlugin(),
    !isDev
      ? new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css',
          chunkFilename: 'css/[name].[contenthash].css',
        })
      : null,
    isDev ? new ProgressPlugin() : null,
  ].filter(Boolean)
}