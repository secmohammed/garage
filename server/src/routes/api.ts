import express from "express";
const router = express.Router();
import AuthenticatePusherController from "../http/controllers/AuthenticatePusherController";
import NearbyDriversController from "../http/controllers/NearbyDriversController";

// @ts-ignore
router.post("/auth/pusher", AuthenticatePusherController.authenticate);
// @ts-ignore
router.get("/nearby-drivers", NearbyDriversController.index);
export default router;
