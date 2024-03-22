import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';

export function buildLoaders(isDev: boolean): ModuleOptions['rules'] {
  return [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
    },
    {
      test: /\.scss$/,
      use: [
        isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: { 
        appendTsSuffixTo: [/\.vue$/],
        transpileOnly: isDev
     },
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    },
  ]
}