import {Router} from "express";
import {
    addNotification,
    deleteNotification,
    displayAllNotifications,
    displayNotification,
    displayNotificationById,
    editNotification
} from "./notificationController";

const baseRouter: Router = Router();

baseRouter.post("/notifications/create", addNotification)
baseRouter.patch("/notifications/edit/:id", editNotification)
baseRouter.delete("/notifications/delete/:id", deleteNotification)
baseRouter.get("/notifications/all", displayAllNotifications)
baseRouter.get("/notifications/:id", displayNotificationById)
baseRouter.get("/notifications/:field/:data", displayNotification)

export default baseRouter;
