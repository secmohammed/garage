import { pusher } from "../../services/pusher";
import { Post, JsonController, Body } from "routing-controllers";
@JsonController()
export default class AuthenticatePusherController {
    @Post("/auth/pusher")
    authenticate(@Body() body: any) {
        const socketId = body.socket_id;
        const channel = body.channel_name;
        let auth = pusher.authenticate(socketId, channel);
        const app_key = body.app_key;
        if (app_key == "aa76177fecc7b75e7d4f") {
            auth = pusher.authenticate(socketId, channel);
        }
        return auth;
    }
}
