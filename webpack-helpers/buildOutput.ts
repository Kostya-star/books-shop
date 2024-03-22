import { Configuration } from 'webpack';

export function buildOutput(path: string): Configuration['output'] {
  return {
    path,
    filename: '[name].[contenthash].js',
    clean: true,
  }
}