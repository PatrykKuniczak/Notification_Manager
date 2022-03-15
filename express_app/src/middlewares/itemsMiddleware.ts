import {IEntityRepository, IJsonMessage, IRepository} from "../controllers/helpers/interfaces";
import {validateOrReject} from "class-validator";
import {getManager} from "typeorm";
import {Task} from "../database/entities/Task";
import {Type} from "../database/entities/Type";
import {Request, Response} from "express";


export const createItem = async (req: Request, res: Response, Repository: IEntityRepository) => {
    const [name, title, description, important, taskType, notificationDate] = validBody(req);
    const dateObj = new Date(notificationDate);

    let result: IRepository | IJsonMessage;

    switch (Repository) {
        case Task:
            const task = new Task();
            task.title = title;
            task.description = description;
            task.important = important;
            task.taskType = taskType;
            task.notificationDate = dateObj;


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
        return getManager().create(Repository, entityObject);

    } catch (err) {
        return createValidationErrors(res, err);
    }
}

export const validBody = (req) => {
    const name = req.body.name ? req.body.name.fullTrim().toTitle() : undefined;
    const title = req.body.title ? req.body.title.fullTrim().toTitle() : undefined;
    const description = req.body.description ? req.body.description.fullTrim() : undefined;
    const important = req.body.important === true || req.body.important === false ? req.body.important : undefined;
    const taskType = req.body.taskType ? req.body.taskType.fullTrim().toTitle() : undefined;
    const notificationDate = req.body.notificationDate ? req.body.notificationDate.fullTrim() : undefined;

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