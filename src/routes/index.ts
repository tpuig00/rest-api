import {Router} from 'express';
import {readdirSync} from 'fs';

const PATH_ROUTER = `${__dirname}/`;
const router = Router();

const cleanFileName = (fileName:string) => {
    return fileName.split('.')[0];
}

readdirSync(PATH_ROUTER).filter((file) => {
    const cleanName = cleanFileName(file);
    if(cleanName !== 'index'){
        import (`./${cleanName}`).then((module) => {
            router.use(`/${cleanName}`,module.router);
        });
    }
    console.info(cleanFileName(file));
});

export {router};