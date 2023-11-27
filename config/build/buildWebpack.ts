import webpack from "webpack";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {buildDevServer} from "./buildDevServer";
import {BuildOptions} from "./types/types";

export function buildWebpack(options:BuildOptions):webpack.Configuration {
    const { mode,paths} = options
    const isDev = mode === 'development'
    return {
        mode,
        entry: { // Входные точки. Один конфиг может собирать много сборок сразу. Ключ = любая строка, позволяющая хоть как то идентифицировать сборку среди других
            main: paths.entry,
            // mobile: path.resolve(__dirname,'src/index.tsx'),
        },
        output: {
            clean: true,
            path: paths.output,
            filename: '[name].[contenthash].js', // [name] берется из ключей entry
            chunkFilename: '[id].[chunkhash].js' // Имена для Lazy компонентов
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
        devServer: isDev ? buildDevServer(options) : undefined
    }
}