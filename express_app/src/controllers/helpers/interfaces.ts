import {Request, Response} from "express";
import {Type} from "../../database/entities/Type";
import {Task} from "../../database/entities/Task";
import {EntityTarget} from "typeorm";

export type IRepository = Type | Task
export type IEntityRepository = EntityTarget<IRepository>;
export type IJsonMessage = { error: string[] };

declare global {
    interface String {
        toTitle(): string
        fullTrim(): string
    }
}

export interface IItems {
    (Repository: IEntityRepository): {
        create(req: Request, res: Response): Promise<Response>
        edit(req: Request, res: Response): Promise<Response>
        delete(req: Request, res: Response): Promise<Response>
        display(req: Request, res: Response): Promise<Response | Response[]>
        displayById(req: Request, res: Response): Promise<Response>
    }
}