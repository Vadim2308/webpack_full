import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {BuildOptions} from "./types/types";

export function buildDevServer(options:BuildOptions):DevServerConfiguration {
    return {
        https:true,
        port:options.port,
        hot:true, // Но для фреймоврка нужно еще https://github.com/pmmmwh/react-refresh-webpack-plugin
        //  Запустить билд локально, если используется роутинг не получается. Надо юзать HashRouter, чтоб можно было посмотреть билд. Но для того чтоб он заработал, также нужно чтоб в каждом компоненте был import React from 'react' (написать свой плагин для babel)
        //  Если раздавать статику через nginx, то надо делать проксирование на index.html
        historyApiFallback:true // При любом роуте сначала идем на индексный файл, и пусть клиентский роутинг уже сам разруливает
    }
}