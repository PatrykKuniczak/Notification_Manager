import {Router} from "express";
import {Notification} from "../database/entities/Notification";
import itemsController from "./itemsController";
import {Type} from "../database/entities/Type";
import {Task} from "../database/entities/Task";


const baseRouter: Router = Router();
const notificationController = itemsController(Notification);
const typeController = itemsController(Type);
const taskController = itemsController(Task);


baseRouter.post("/notifications", async (req, res) => await notificationController.create(req, res));
baseRouter.put("/notifications/:id", async (req, res) => await notificationController.edit(req, res));
baseRouter.delete("/notifications/:id", async (req, res) => await notificationController.delete(req, res));
baseRouter.get("/notifications/all", async (req, res) => await notificationController.displayAll(req, res));
baseRouter.get("/notifications/:id", async (req, res) => await notificationController.displayById(req, res));
baseRouter.get("/notifications", async (req, res) => await notificationController.displayOne(req, res));


baseRouter.post("/types", async (req, res) => await typeController.create(req, res));
baseRouter.put("/types/:id", async (req, res) => await typeController.edit(req, res));
baseRouter.delete("/types/:id", async (req, res) => await typeController.delete(req, res));
baseRouter.get("/types/all", async (req, res) => await typeController.displayAll(req, res));
baseRouter.get("/types/:id", async (req, res) => await typeController.displayById(req, res));
baseRouter.get("/types", async (req, res) => await typeController.displayOne(req, res));


baseRouter.post("/tasks", async (req, res) => await taskController.create(req, res));
baseRouter.put("/tasks/:id", async (req, res) => await taskController.edit(req, res));
baseRouter.delete("/tasks/:id", async (req, res) => await taskController.delete(req, res));
baseRouter.get("/tasks/all", async (req, res) => await taskController.displayAll(req, res));
baseRouter.get("/tasks/:id", async (req, res) => await taskController.displayById(req, res));
baseRouter.get("/tasks", async (req, res) => await taskController.displayOne(req, res));


export default baseRouter;