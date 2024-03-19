import path from 'path';
import { Configuration } from 'webpack';
import 'webpack-dev-server';
import { buildLoaders } from './webpack-helpers/buildLoaders';
import { buildPlugins } from './webpack-helpers/buildPlugins';
import { buildResolvers } from './webpack-helpers/buildResolvers';
import { buildDevServer } from './webpack-helpers/buildDevServer';
import { buildEntry } from './webpack-helpers/buildEntry';
import { buildOutput } from './webpack-helpers/buildOutput';

type Mode = 'development' | 'production';

interface EnvVariables {
  mode?: Mode;
  port?: number;
}

export default (env: EnvVariables) => {
  const isDev = env.mode === 'development';

  const entryPath = path.resolve(__dirname, 'src', 'index.ts')
  const outputPath = path.resolve(__dirname, 'build')
  const htmlPath = path.resolve(__dirname, 'public', 'index.html')
  const aliasPath = path.resolve(__dirname, 'src')

  const config: Configuration = {
    mode: env.mode || 'development',
    entry: buildEntry(entryPath),
    output: buildOutput(outputPath),
    module: {
      rules: buildLoaders(isDev),
    },
    plugins: buildPlugins(htmlPath, isDev),
    resolve: buildResolvers(aliasPath),
    devServer: buildDevServer(isDev, env.port),
    devtool: isDev ? 'inline-source-map' : undefined,
    // optimization: {
    //   splitChunks: {
    //     chunks: 'all',
    //   },
    // },
  };

  return config;
};
