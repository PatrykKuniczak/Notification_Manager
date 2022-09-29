import {Router} from "express";
import {Task} from "../database/entities/Task";
import entityController from "./entityController";
import {User} from "../database/entities/User";


const baseRouter: Router = Router();


baseRouter.post("/tasks", async (req, res) => await entityController(Task).create(req, res));
baseRouter.put("/tasks/:id", async (req, res) => await entityController(Task).edit(req, res));
baseRouter.delete("/tasks/:id", async (req, res) => await entityController(Task).delete(req, res));
baseRouter.get("/tasks/:id", async (req, res) => await entityController(Task).display(req, res));
baseRouter.get("/tasks", async (req, res) => await entityController(Task).display(req, res));

baseRouter.post("/users", async (req, res) => await entityController(User).create(req, res));
baseRouter.put("/users/:id", async (req, res) => await entityController(User).edit(req, res));
baseRouter.delete("/users/:id", async (req, res) => await entityController(User).delete(req, res));
baseRouter.get("/users/:id", async (req, res) => await entityController(User).display(req, res));
baseRouter.get("/users", async (req, res) => await entityController(User).display(req, res));


export default baseRouter;