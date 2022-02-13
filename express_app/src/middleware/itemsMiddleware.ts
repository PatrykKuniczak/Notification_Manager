import {IEntityRepository, IJsonMessage, IRepository} from "../controller/helpers/interfaces";
import {validateOrReject} from "class-validator";
import {getManager} from "typeorm";
import {Notification} from "../database/entity/Notification";
import {Task} from "../database/entity/Task";
import {Type} from "../database/entity/Type";
import {Request, Response} from "express";


export const createItem = async (req: Request, res: Response, Repository: IEntityRepository) => {
    const [name, title, description] = validBody(req);

    let result: IRepository | IJsonMessage;

    switch (Repository) {
        case Notification:
            const notification = new Notification();
            notification.title = title;
            notification.description = description;

            result = await validItem(req, res, Repository, notification);
            break;

        case Task:
            const task = new Task();
            task.title = title;
            task.description = description;

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

    return [name, title, description]
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