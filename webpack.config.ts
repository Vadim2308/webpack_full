import HtmlWebpackPlugin from "html-webpack-plugin";
import path from 'path';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

type Mode = 'production' | 'development'
interface EnvVariables {
    port:number,
    mode:Mode
}

export default (env:EnvVariables) => {
    const isDev = env.mode === 'development'
    const isProd = env.mode === 'production'
    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: { // Входные точки. Один конфиг может собирать много сборок сразу. Ключ = любая строка, позволяющая хоть как то идентифицировать сборку среди других
            web: path.resolve(__dirname,'src/index.tsx'),
            // mobile: path.resolve(__dirname,'src/index.tsx'),
        },
        output: {
            clean: true,
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js', // [name] берется из ключей entry
        },
        plugins: [
            new HtmlWebpackPlugin({ template: "./public/index.html"}),
            isDev ? new webpack.ProgressPlugin() : undefined, // медленный,
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            })
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.tsx?$/, // ts loader умеет работать с JSX
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'], // Позволяет нам не писать расширения при импорте Н-р: import {some} from './test.ts'
        },
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? {
            https:true,
            port:env.port ?? 3000,
            open:true
        } : undefined
    }
    return config;
}