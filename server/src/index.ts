import express, { Express } from "express";
import bodyParser from "body-parser";
import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import AuthenticatePusherController from "./http/controllers/AuthenticatePusherController";
import NearbyDriversController from "./http/controllers/NearbyDriversController";
import UserToDriverController from "./http/controllers/UserToDriverController";

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
useExpressServer(app, {
    // register created express server in routing-controllers
    controllers: [
        AuthenticatePusherController,
        NearbyDriversController,
        UserToDriverController
    ]
});
// need to use .env
app.listen(4000, () => {
    console.log("server started on http://localhost:4000");
});
