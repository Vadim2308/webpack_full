import type { Configuration } from "webpack";
import {BuildOptions} from "./types/types";

export function buildResolvers(options:BuildOptions):Configuration['resolve']{
    return {
        extensions: ['.tsx', '.ts', '.js'], // Позволяет нам не писать расширения при импорте Н-р: import {some} from './test.ts'
        alias:{
            "@":options.paths.src
        }
    }
}