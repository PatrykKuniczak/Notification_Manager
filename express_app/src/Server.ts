import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import logger from "./shared/Logger";
import bodyParser from "body-parser";
import BaseRouter from "./routers";
import "reflect-metadata";
import {createConnection} from "typeorm";


(async () => {
    try {
        const conn = await createConnection();
        logger.info('Connection to database: ' + conn.isConnected)
    } catch (e: any) {
        logger.err(e.message)
    }
})()

const app = express()

app.use(express.json());
app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api', BaseRouter);

export default app;