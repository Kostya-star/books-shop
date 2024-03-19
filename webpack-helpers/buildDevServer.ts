export function buildDevServer(isDev: boolean, port: number) {
  return isDev
  ? {
      port: port || 3000,
      open: true,
    }
  : undefined
}