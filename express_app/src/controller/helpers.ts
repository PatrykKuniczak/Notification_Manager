import {DeleteResult, UpdateResult} from "typeorm";

export function checkResult(result: DeleteResult | UpdateResult){
    if (result.affected === 0) {
        return 404;
    } else {
        return 200;
    }
}
