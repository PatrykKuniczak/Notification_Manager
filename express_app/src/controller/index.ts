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

export default baseRouter;
