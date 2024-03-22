import { Configuration } from 'webpack';

export function buildResolvers(path: string): Configuration['resolve'] {
  return {
    alias: {
      '@': path,
    },
    extensions: ['.ts', '.js', '.vue', '.json'],
  }
}