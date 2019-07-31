import { pusher } from "../../services/pusher";
import { v4 } from "uuid";
import { Get, JsonController, Body } from "routing-controllers";
@JsonController()
export default class UserToDriverController {
    @Get("/drivers/subscribe")
    generate(@Body() body: any): String {
        // perhaps user is moving as well.
        pusher.trigger(
            `private-channel-user-${body.uuid}`,
            "sync-geolocation",
            {
                latitude: body.latitude,
                longitude: body.longitude
            }
        );
        let uuid = v4();
        pusher.trigger(
            `private-channel-driver-${uuid}`,
            "sync-geolocation",
            {}
        );
        return uuid;
    }
}
