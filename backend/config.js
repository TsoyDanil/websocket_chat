import * as path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootPath = __dirname;

export default {
    rootPath,
    db: {
        name: 'chat',
        url: 'mongodb://localhost'
    }
};