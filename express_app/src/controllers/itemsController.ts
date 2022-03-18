import {Request, Response} from "express";
import {DeleteResult, getManager} from "typeorm";
import {createItem} from "../services/itemsService";
import {IEntityRepository, IItems} from "./helpers/interfaces";
import {instanceOfIJsonMessage} from "./helpers/helpers";


const itemsController: IItems = (Repository: IEntityRepository) => ({

    create: async (req: Request, res: Response): Promise<Response> => {
        const result = await createItem(req, res, Repository);

        if (instanceOfIJsonMessage(result))
            return res.status(401).send(result);

        return await getManager().save(result)
            .then(() => res.sendStatus(201))
            .catch(() => res.sendStatus(404));

    },


    edit: async (req: Request, res: Response): Promise<Response> => {
        const result = await createItem(req, res, Repository);

        if (instanceOfIJsonMessage(result))
            return res.status(401).send(result);

        try {

            const updateResult = await getManager().update(Repository, req.params.id, result);
            const status = !updateResult.affected ? 404 : 200;

            return status === 404 ? res.status(status).send({message: "Record Not Found"}) : res.sendStatus(status);

        } catch (err: any) {
            return res.status(404).send({message: err.sqlMessage});
        }
    },


    delete: async (req: Request, res: Response): Promise<Response> => {

        if (req.params.id) {
            try {
                const result: DeleteResult = await getManager().delete(Repository, req.params.id);
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
            let {field, data} = req.query;

            field = field.fullTrim();
            data = data.fullTrim();

            if (field && data) {
                try {
                    const result = await getManager().findOne(Repository, {[field]: data});

                    return result ? res.status(200).send(result) : res.status(404).send({message: "Record Not Found"});

                } catch (err: any) {
                    return err.sqlMessage ? res.status(404).send({message: err.sqlMessage})
                        : res.status(404).send({message: "Record Not Found"});
                }
            } else {
                return res.status(404).send({message: "Fields can't be empty"});
            }
        } else {
            const result = await getManager().find(Repository);
            return res.status(200).send(result);
        }
    },


    displayById: async (req: Request, res: Response): Promise<Response> => {
        const id = req.params.id.fullTrim();

        if (id) {
            const result = await getManager().findOne(Repository, id);
            return result ? res.status(200).send(result) : res.status(404).send({message: "Record Not Found"});

        } else {
            return res.status(404).send({message: "Field can't be empty"});
        }
    }
});

export default itemsController;