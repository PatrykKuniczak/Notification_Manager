import logger from "./shared/Logger";
import "reflect-metadata";
import {createConnection} from "typeorm";


createConnection().then(res => {
    logger.info('Connection to database: ' + res.isConnected)
}).catch(res => {
    logger.err(res.message)
})

