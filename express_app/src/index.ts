import "reflect-metadata";
import {DataSource} from "typeorm";
import logger from "jet-logger";
import baseRouter from "./controllers";
import express, {Express} from "express"
import morgan from 'morgan';
import cors from "cors"
import cookieParser from "cookie-parser"
import {Task} from "./database/entities/Task";
import {Type} from "./database/entities/Type";
import dotenv from "dotenv";


const app: Express = express();

if (process.env.NODE_ENV === "production") {
    dotenv.config({path: "./src/production.env"});
} else {
    dotenv.config({path: "./src/development.env"});
    app.use(morgan("dev"));
}

const db: any = process.env.DATABASE;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api', baseRouter);

export const AppDataSource = new DataSource({
    type: db,
    url: process.env.DB_URL,
    synchronize: true,
    entities: [Task, Type]
})

AppDataSource.initialize()
    .then(() => {
        logger.info('Database is connected!')
        app.listen(9000, () => {
            logger.info('Express server started on port: 9000');
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })