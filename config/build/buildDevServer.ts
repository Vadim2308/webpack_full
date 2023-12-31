import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {BuildOptions} from "./types/types";

/**
 * В некоторых конфигах есть ключ, write вроде. Он пишет все изменения в файловую систему в деве. НО это очень дорого, и не стоит так делать. Девсервер хранит всю сборку у себя, и не насилует FS, ускоряется разработка
 * @param options
 */
export function buildDevServer(options:BuildOptions):DevServerConfiguration {
    return {
        https: true,
        port: options.port,
        hot: true, // Но для фреймоврка нужно еще https://github.com/pmmmwh/react-refresh-webpack-plugin
        //  Запустить билд локально, если используется роутинг не получается. Надо юзать HashRouter, чтоб можно было посмотреть билд. Но для того чтоб он заработал, также нужно чтоб в каждом компоненте был import React from 'react' (написать свой плагин для babel)
        //  Если раздавать статику через nginx, то надо делать проксирование на index.html
        historyApiFallback: true, // При любом роуте сначала идем на индексный файл, и пусть клиентский роутинг уже сам разруливает
        proxy: {
            '/api': {
                target: 'https://jsonplaceholder.typicode.com',
                pathRewrite: { '^/api': '' },
                secure: false,
                changeOrigin: true, // (origin) – комбинация домен/порт/протокол Если changeOrigin установлен в true, то заголовок Origin будет изменен на целевой URL при отправке запросов через прокси. Это полезно в тех случаях, когда удаленный сервер ожидает запросы с определенным значением заголовка Origin. Установка changeOrigin в true позволяет адаптировать Origin к целевому серверу, что может помочь в обходе проблем с CORS (Cross-Origin Resource Sharing) при разработке и отладке приложений.
            }
        }
    }
}