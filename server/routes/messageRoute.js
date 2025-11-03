import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getmessages, getUsersForSidebar, markMessagesSeen, sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router()

messageRouter.get("/users", protectRoute, getUsersForSidebar)
messageRouter.get("/:id", protectRoute, getmessages)
messageRouter.get("/mark/:id", protectRoute, markMessagesSeen)
messageRouter.post("/send/:id",protectRoute,sendMessage)
export default messageRouter;