import {Request, Response} from "express";
import {Notification} from "../database/entity/Notification";
import {DeleteResult, getManager, UpdateResult} from "typeorm";
import {checkResult} from "./helpers";


export async function addNotification(req: Request, res: Response): Promise<number> {
    let {name, description} = req.body;
    name = name.fullTrim().toTitle();
    description = description.fullTrim();

    if (name && description !== "") {
        try {
            const result: Notification = await getManager().create(Notification, {name, description});
            await getManager().save(result);
            return res.sendStatus(201);

        } catch (err: any) {
            return res.sendStatus(404);
        }
    } else {
        return res.sendStatus(400);
    }
}

export async function editNotification(req: Request, res: Response): Promise<number> {
    let {field, newData} = req.body;
    field = field.fullTrim();
    newData = field === "name" ? newData.fullTrim().toTitle() : newData.fullTrim();

    if (newData && field !== "" && field !== "id") {

        try {
            req.params.id = Number(req.params.id);
            const result: UpdateResult = await getManager().update(Notification, req.params.id, {[field]: newData});
            const status: number = checkResult(result);

            return res.sendStatus(status);

        } catch (err: any) {
            return res.sendStatus(404);
        }
    } else {
        return res.sendStatus(404);
    }

}

export async function deleteNotification(req: Request, res: Response): Promise<number> {
    if (req.params.id !== undefined) {
        try {
            req.params.id = Number(req.params.id);
            const result: DeleteResult = await getManager().delete(Notification, req.params.id);
            const status: number = checkResult(result);

            return res.sendStatus(status);
        } catch (err: any) {
            return res.sendStatus(404);
        }
    } else {
        return res.sendStatus(404);
    }
}

export async function displayAllNotifications(req: Request, res: Response): Promise<Notification[] | []> {
    const result: Notification[] = await getManager().find(Notification);
    return res.send(result)
}

export async function displayNotification(req: Request, res: Response): Promise<Notification | number> {
    let {field, data} = req.params;

    field = field.fullTrim();
    data = data.fullTrim();

    if (field && data !== "") {
        try {
            const result: Notification | object = await getManager().findOne(Notification, {[field]: data});
            if (result === undefined)
                return res.sendStatus(404);

            return res.send(result)
        } catch (err: any) {
            return res.sendStatus(404)
        }
    } else {
        return res.sendStatus(404);
    }

}

export async function displayNotificationById(req: Request, res: Response): Promise<Notification | number> {
    const id = req.params.id.fullTrim();

    if (id !== "") {
        try {
            const result: Notification | object = await getManager().findOne(Notification, id);
            if (result === undefined)
                return res.sendStatus(404);

            return res.send(result);
        } catch (err: any) {
            return res.sendStatus(404)
        }
    } else {
        return res.sendStatus(404);
    }
}