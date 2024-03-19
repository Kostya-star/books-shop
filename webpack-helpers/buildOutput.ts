export function buildOutput(path: string) {
  return {
    path,
    filename: '[name].[contenthash].js',
    clean: true,
  }
}