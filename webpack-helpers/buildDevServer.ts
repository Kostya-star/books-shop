import { Configuration } from 'webpack';

export function buildDevServer(isDev: boolean, port: number): Configuration['devServer'] {
  return isDev
  ? {
      port: port || 3000,
      // open: true,
      historyApiFallback: true,
    }
  : undefined
}