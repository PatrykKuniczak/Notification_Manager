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

baseRouter.post("/notification/create", addNotification)
baseRouter.put("/notification/edit/:id", editNotification)
baseRouter.delete("/notification/delete/:id", deleteNotification)
baseRouter.get("/notification/all", displayAllNotifications)
baseRouter.get("/notification/:id", displayNotificationById)
baseRouter.get("/notification/:field/:data", displayNotification)

export default baseRouter;
