import { v4 } from "uuid";
import { Get, OnUndefined, JsonController } from "routing-controllers";
import { pusher } from "../../services/pusher";
interface UserLocation {
    latitude: Number;
    longitude: Number;
}
@JsonController()
export default class NearbyDriversController {
    @Get("/nearby-drivers")
    @OnUndefined(404)
    index(): String {
        const users: Array<UserLocation> = [
            {
                latitude: 30.003912,
                longitude: 31.40125
            },
            {
                latitude: 30.00391,
                longitude: 31.40123
            },
            {
                latitude: 30.0039,
                longitude: 31.40121
            }
        ];
        const uuid = v4();

        pusher.trigger(`protected-channel-${uuid}`, "found-nearby-users", {
            users
        });
        return uuid;
    }
}
