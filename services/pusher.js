import Pusher from "pusher-js/react-native";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

export const pusher = new Pusher("aa76177fecc7b75e7d4f", {
    authEndpoint: "http://localhost:4000/auth/pusher",

    cluster: "eu",
    forceTLS: true,
    auth: {
        params: {
            app_key: "aa76177fecc7b75e7d4f"
        }
    }
});
