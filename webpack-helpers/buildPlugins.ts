import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import { Configuration, ProgressPlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export function buildPlugins(path: string, faviconPath: string, isDev: boolean): Configuration['plugins'] {
  return [
    new HtmlWebpackPlugin({ 
      template: path,
      favicon: faviconPath 
    }),
    new VueLoaderPlugin(),
    !isDev
      ? new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css',
          chunkFilename: 'css/[name].[contenthash].css',
        })
      : null,
    isDev ? new ProgressPlugin() : null,
    isDev ? new ForkTsCheckerWebpackPlugin() : null
  ].filter(Boolean)
}