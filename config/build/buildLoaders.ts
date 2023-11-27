import type { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import {buildBabelLoader} from "./babel/buildBabelLoader";

export function buildLoaders(options:BuildOptions):ModuleOptions['rules'] {
    const isDev = options.mode === 'development'

    const svgLoader = {
        test: /\.svg$/,
        use: [
            {
               loader: '@svgr/webpack',
              options: {
                   icon: true,  // !обязательная опция, позволяет применять ширину/высоту для икноки пропсами, даже если есть встроенные размеры в svg
                   svgoConfig:{
                       plugins:[
                           {
                               name:"convertColors", // Позволяет задавать цвет svg через style={color:"green"}, даже если у svg есть свой собственный fill
                               params:{
                                   currentColor:true
                               }
                           }
                       ]
                   }
               }
            }],
    }

    const assetsLoader = {
            test: /\.(png|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
    }

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? "[path][name]__[local]" : '[hash:base64:8]'
            },
        },
    }

 const scssLoader = {
     test: /\.s[ac]ss$/i,
     use: [
         MiniCssExtractPlugin.loader,
         // Translates CSS into CommonJS
         cssLoaderWithModules,
         // Compiles Sass to CSS
         "sass-loader",
     ],
 }
    // const tsLoader =  {
    //         test: /\.tsx?$/, // ts loader умеет работать с JSX
    //         use: [
    //             {
    //                 loader: 'ts-loader',
    //                 options:{
    //                     getCustomTransformers: () => ({
    //                         before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
    //                     }),
    //                     transpileOnly: isDev // При сборке лучше не проверять типы, ибо очень долго. Лучше проверку вынести в отдельный процесс в CI или Husky. Либо использовать fork-ts-checker-webpack-plugin
    //                 }
    //             }
    //         ],
    //         exclude: /node_modules/,
    // }
    const babelLoader = buildBabelLoader(options)

 return [
     svgLoader,
     assetsLoader,
     scssLoader,
     babelLoader
 ]
}