import {Request, Response} from "express";
import {DeleteResult, getManager, UpdateResult} from "typeorm";
import {checkResult} from "./helpers";
import {Type} from "../database/entity/Type";


export async function addType(req: Request, res: Response): Promise<number> {
    let {name} = req.body;

    name = name.fullTrim().toTitle();

    if (name !== "") {
        try {
            const result: Type = await getManager().create(Type, {name});
            await getManager().save(result);
            return res.sendStatus(201);

        } catch (err: any) {
            return res.sendStatus(404);
        }
    } else {
        return res.sendStatus(400);
    }
}

export async function editType(req: Request, res: Response): Promise<number> {
    let {field, newData} = req.body;

    field = field.fullTrim();
    newData = field === "name" ? newData.fullTrim().toTitle() : newData.fullTrim();

    if (newData && field !== "" && field !== "id") {

        try {
            req.params.id = Number(req.params.id);
            const result: UpdateResult = await getManager().update(Type, req.params.id, {[field]: newData});
            const status: number = checkResult(result);

            return res.sendStatus(status);

        } catch (err: any) {
            return res.sendStatus(404);
        }
    } else {
        return res.sendStatus(404);
    }

}

export async function deleteType(req: Request, res: Response): Promise<number> {
    if (req.params.id !== undefined) {
        try {
            req.params.id = Number(req.params.id);
            const result: DeleteResult = await getManager().delete(Type, req.params.id);
            const status: number = checkResult(result);

            return res.sendStatus(status);
        } catch (err: any) {
            return res.sendStatus(404);
        }
    } else {
        return res.sendStatus(404);
    }
}

export async function displayAllTypes(req: Request, res: Response): Promise<Type[] | []> {
    const result: Type[] = await getManager().find(Type);
    return res.send(result)
}

export async function displayType(req: Request, res: Response): Promise<Type | number> {
    let {field, data} = req.params;

    field = field.fullTrim();
    data = data.fullTrim();

    if (field && data !== "") {
        try {
            const result: Type | object = await getManager().findOne(Type, {[field]: data});
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

export async function displayTypeById(req: Request, res: Response): Promise<Type | number> {
    const id = req.params.id.fullTrim();

    if (id !== "") {
        try {
            const result: Type | object = await getManager().findOne(Type, id);
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