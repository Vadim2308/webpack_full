import path from 'path';
import {buildWebpack} from "./config/build/buildWebpack";
import type {BuildPaths, BuildPlatforms} from "./config/build/types/types";

type Mode = 'production' | 'development'
interface EnvVariables {
    port:number,
    mode:Mode
    analyzer?:boolean
    platform?:BuildPlatforms
}

export default (env:EnvVariables) => {
    const paths:BuildPaths = {
        output:path.resolve(__dirname,'build'),
        entry:path.resolve(__dirname,'src/index.tsx'),
        html:path.resolve(__dirname,'public/index.html'),
        public:path.resolve(__dirname,'public'),
        src:path.resolve(__dirname,'src'),
    }
    return buildWebpack({
        port:env.port ?? 3000,
        mode:env.mode ?? 'development',
        paths,
        analyzer:env.analyzer,
        platform:env.platform ?? 'desktop'
    })
}