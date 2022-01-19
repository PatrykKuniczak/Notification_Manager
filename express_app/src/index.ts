import logger from "./shared/Logger";
import app from "./Server";

app.listen(9000, () => {
    logger.info('Express server started on port: 9000');
});