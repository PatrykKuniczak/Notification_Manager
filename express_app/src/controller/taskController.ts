import {Request, Response} from "express";
import {DeleteResult, getManager, UpdateResult} from "typeorm";
import {checkResult} from "./helpers";
import {Type} from "../database/entity/Type";
import {Task} from "../database/entity/Task";


export async function addTask(req: Request, res: Response): Promise<number> {
    let {title, description} = req.body;
    title = title.fullTrim().toTitle();
    description = description.fullTrim();

    if (title && description !== "") {
        try {
            const result: Task = await getManager().create(Task, {title, description});
            await getManager().save(result);
            return res.sendStatus(201);

        } catch (err: any) {
            return res.sendStatus(404);
        }
    } else {
        return res.sendStatus(400);
    }
}

export async function editTask(req: Request, res: Response): Promise<number> {
    let {title, description} = req.body;
    title = title.fullTrim().toTitle();
    description = description.fullTrim();

    if (title && description !== "") {

        try {
            req.params.id = Number(req.params.id);
            const result: UpdateResult = await getManager().update(Task, req.params.id, {title, description});
            const status: number = checkResult(result);

            return res.sendStatus(status);

        } catch (err: any) {
            return res.sendStatus(404);
        }
    } else {
        return res.sendStatus(404);
    }

}

export async function deleteTask(req: Request, res: Response): Promise<number> {
    if (req.params.id !== undefined) {
        try {
            req.params.id = Number(req.params.id);
            const result: DeleteResult = await getManager().delete(Task, req.params.id);
            const status: number = checkResult(result);

            return res.sendStatus(status);
        } catch (err: any) {
            return res.sendStatus(404);
        }
    } else {
        return res.sendStatus(404);
    }
}

export async function displayAllTasks(req: Request, res: Response): Promise<Task[] | []> {
    const result: Task[] = await getManager().find(Task);
    return res.send(result)
}

export async function displayTask(req: Request, res: Response): Promise<Task | number> {
    let {field, data} = req.params;

    field = field.fullTrim();
    data = data.fullTrim();

    if (field && data !== "") {
        try {
            const result: Type | object = await getManager().findOne(Task, {[field]: data});
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

export async function displayTaskById(req: Request, res: Response): Promise<Task | number> {
    const id = req.params.id.fullTrim();

    if (id !== "") {
        try {
            const result: Type | object = await getManager().findOne(Task, id);
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