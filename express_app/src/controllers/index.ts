import {Router} from "express";
import itemsController from "./itemsController";
import {Type} from "../database/entities/Type";
import {Task} from "../database/entities/Task";

// toDO: GDY ŁĄCZY SIĘ WYSAKUJE BŁĄD GDY FRONTED ZAPYTA W TYM CZASIE
// TODO: NIE MOŻNA DODAĆ TYPU Z POLSKIM ZNAKIEM
const baseRouter: Router = Router();
const typeController = itemsController(Type);
const taskController = itemsController(Task);


baseRouter.post("/types", async (req, res) => await typeController.create(req, res));
baseRouter.put("/types/:id", async (req, res) => await typeController.edit(req, res));
baseRouter.delete("/types/:id", async (req, res) => await typeController.delete(req, res));
baseRouter.get("/types/:id", async (req, res) => await typeController.displayById(req, res));
baseRouter.get("/types", async (req, res) => await typeController.display(req, res));


baseRouter.post("/tasks", async (req, res) => await taskController.create(req, res));
baseRouter.put("/tasks/:id", async (req, res) => await taskController.edit(req, res));
baseRouter.delete("/tasks/:id", async (req, res) => await taskController.delete(req, res));
baseRouter.get("/tasks/:id", async (req, res) => await taskController.displayById(req, res));
baseRouter.get("/tasks", async (req, res) => await taskController.display(req, res));


export default baseRouter;