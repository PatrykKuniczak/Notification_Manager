import {Request, Response} from "express";
import {DeleteResult} from "typeorm";
import {createItem} from "../services/itemsService";
import {IEntityRepository, IItems} from "./helpers/interfaces";
import {fullTrim, instanceOfIJsonMessage} from "./helpers/helpers";
import {AppDataSource} from "../index";


const itemsController: IItems = (Repository: IEntityRepository) => ({

    create: async (req: Request, res: Response): Promise<Response> => {
        const result = await createItem(req, res, Repository);

        if (instanceOfIJsonMessage(result)) {
            return res.status(406).send(result)
        }

        return await AppDataSource.manager.save(result)
            .then(() => {
                return res.sendStatus(201)
            })
            .catch(() => res.sendStatus(404))
    },


    edit: async (req: Request, res: Response): Promise<Response> => {
        const result = await createItem(req, res, Repository);

        if (instanceOfIJsonMessage(result))
            return res.status(401).send(result);

        try {
            const updateResult = await AppDataSource.manager.update(Repository, req.params.id, result);
            const status = !updateResult.affected ? 404 : 200;

            return status === 404 ? res.status(status).send({message: "Record Not Found"}) : res.sendStatus(status);

        } catch (err: any) {
            return res.status(404).send({message: err.sqlMessage});
        }
    },


    delete: async (req: Request, res: Response): Promise<Response> => {

        if (req.params.id) {
            try {
                const result: DeleteResult = await AppDataSource.manager.delete(Repository, req.params.id);
                const status = !result.affected ? 404 : 200;

                return status === 404 ? res.status(status).send({message: "Record Not Found"}) : res.sendStatus(status);
            } catch (err: any) {
                return res.status(404).send({message: err.sqlMessage});
            }
        } else {
            return res.status(404).send({message: "Id can't be empty"});
        }
    },

    display: async (req: Request, res: Response): Promise<Response | Response[]> => {
        if (Object.keys(req.query).length > 0) {
            let {field, data}: { field: string, data: string } = req.query;

            field = fullTrim(field);
            data = fullTrim(data);

            if (field && data) {
                try {
                    const result = await AppDataSource.manager.findBy(Repository, {[field]: data});

                    return result ? res.status(200).send(result) : res.status(404).send({message: "Record Not Found"});

                } catch (err: any) {
                    return err.sqlMessage ? res.status(404).send({message: err.sqlMessage})
                        : res.status(404).send({message: "Record Not Found"});
                }
            } else {
                return res.status(404).send({message: "Fields can't be empty"});
            }
        } else if (Object.keys(req.params).length > 0) {
            const id = +req.params.id;

            const result = await AppDataSource.manager.findBy(Repository, {id});

            return Boolean(result.length) ? res.status(200).send(result[0]) : res.status(404).send({message: "Record Not Found"});
        } else {
            const result = await AppDataSource.manager.find(Repository);

            return res.status(200).send(result);
        }
    }
});

export default itemsController;