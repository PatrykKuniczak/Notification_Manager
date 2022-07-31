import {Request, Response} from "express";
import {Task} from "../../database/entities/Task";
import {EntityTarget} from "typeorm";

export type IRepository = Task
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
    }
}