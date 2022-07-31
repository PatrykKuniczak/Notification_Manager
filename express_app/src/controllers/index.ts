import {Router} from "express";
import itemsController from "./itemsController";
import {Task} from "../database/entities/Task";


const baseRouter: Router = Router();
const taskController = itemsController(Task);


baseRouter.post("/tasks", async (req, res) => await taskController.create(req, res));
baseRouter.put("/tasks/:id", async (req, res) => await taskController.edit(req, res));
baseRouter.delete("/tasks/:id", async (req, res) => await taskController.delete(req, res));
baseRouter.get("/tasks/:id", async (req, res) => await taskController.display(req, res));
baseRouter.get("/tasks", async (req, res) => await taskController.display(req, res));


export default baseRouter;