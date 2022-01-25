import {Router} from "express";
import {
    addNotification,
    deleteNotification,
    displayAllNotifications,
    displayNotification,
    displayNotificationById,
    editNotification
} from "./notificationController";
import {addType, deleteType, displayAllTypes, displayType, displayTypeById, editType} from "./typeController";
import {addTask, deleteTask, displayAllTasks, displayTask, displayTaskById, editTask} from "./taskController";

const baseRouter: Router = Router();

baseRouter.post("/notifications/create", addNotification)
baseRouter.patch("/notifications/edit/:id", editNotification)
baseRouter.delete("/notifications/delete/:id", deleteNotification)
baseRouter.get("/notifications/all", displayAllNotifications)
baseRouter.get("/notifications/:id", displayNotificationById)
baseRouter.get("/notifications/:field/:data", displayNotification)

baseRouter.post("/types/create", addType)
baseRouter.patch("/types/edit/:id", editType)
baseRouter.delete("/types/delete/:id", deleteType)
baseRouter.get("/types/all", displayAllTypes)
baseRouter.get("/types/:id", displayTypeById)
baseRouter.get("/types/:field/:data", displayType)

baseRouter.post("/tasks/create", addTask)
baseRouter.put("/tasks/edit/:id", editTask)
baseRouter.delete("/tasks/delete/:id", deleteTask)
baseRouter.get("/tasks/all", displayAllTasks)
baseRouter.get("/tasks/:id", displayTaskById)
baseRouter.get("/tasks/:field/:data", displayTask)

export default baseRouter;
