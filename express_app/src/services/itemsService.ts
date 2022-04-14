import {IEntityRepository, IJsonMessage, IRepository} from "../controllers/helpers/interfaces";
import {validateOrReject} from "class-validator";
import {Task} from "../database/entities/Task";
import {Type} from "../database/entities/Type";
import {Request, Response} from "express";
import {AppDataSource} from "../index";
import {createTimeStamp, fullTrim, toTitle} from "../controllers/helpers/helpers";


export const createItem = async (req: Request, res: Response, Repository: IEntityRepository) => {
    const [name, title, description, important, taskType, notificationDate] = validBody(req);

    let result: IRepository | IJsonMessage;

    const reqTimeStamp = createTimeStamp(notificationDate);

    switch (Repository) {
        case Task:
            const task = new Task();
            task.title = title;
            task.description = description;
            task.important = important;
            task.taskType = taskType;
            task.notificationDate = reqTimeStamp;

            result = await validItem(req, res, Repository, task);
            break;

        case Type:
            const type = new Type();
            type.name = name;

            result = await validItem(req, res, Repository, type);
    }

    return result
}

export const validItem = async (req, res, Repository, entityObject): Promise<IJsonMessage | IRepository> => {
    try {
        await validateOrReject(entityObject);
        return AppDataSource.manager.create(Repository, entityObject);

    } catch (err) {
        return createValidationErrors(res, err);
    }
}

export const validBody = (req) => {
    const name = req.body.name && toTitle(fullTrim(req.body.name));
    const title = req.body.title && toTitle(fullTrim(req.body.title));
    const description = req.body.description && toTitle(fullTrim(req.body.description));
    const important = (req.body.important === true || req.body.important === false) && req.body.important;
    const taskType = req.body.taskType && toTitle(fullTrim(req.body.taskType));
    const notificationDate = req.body.notificationDate;

    return [name, title, description, important, taskType, notificationDate]
}

export const createValidationErrors = (res, err): IJsonMessage => {
    const errorMappedArray = err.map((value) => {
        return Object.values(value.constraints);
    });

    if (errorMappedArray.length > 1) {
        const errorsArray = errorMappedArray.reduce((acc, currValue) => {
            return acc + "@##@" + currValue
        }).split("@##@");

        return {error: errorsArray};
    }

    return {error: errorMappedArray[0]};
}