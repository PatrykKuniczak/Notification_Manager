import logger from "./shared/Logger";
import app from "./Server";

app.listen(process.env.PORT, () => {
    logger.info('Express server started on port: ' + process.env.EXPRESS_PORT);
});