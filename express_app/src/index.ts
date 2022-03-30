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


dotenv.config({path: "./src/.env"});

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use('/api', baseRouter);

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.HOST,
    port: +process.env.PORT,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
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