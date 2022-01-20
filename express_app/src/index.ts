import "./Server"
import logger from "./shared/Logger";
import baseRouter from "./controller";
import express from "express"
import morgan from 'morgan';
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use('/api', baseRouter);
app.listen(9000, () => {
    logger.info('Express server started on port: 9000');
});