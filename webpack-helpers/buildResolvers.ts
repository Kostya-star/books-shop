export function buildResolvers(path: string) {
  return {
    alias: {
      '@': path,
    },
    extensions: ['.ts', '.js', '.vue', '.json'],
  }
}