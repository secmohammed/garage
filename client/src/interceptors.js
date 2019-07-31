import { toast } from "./services/toast";
export default function setup() {
    axios.interceptors.request.use(
        config => {
            const token = store.getters["user/getToken"];
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        },
        err => console.log(err, "error request")
    );
    axios.interceptors.response.use(
        response => {
            let hasSuccess = _.some(response, res => _.has(res, "success"));
            let hasMessage = _.some(response, res => _.has(res, "message"));
            if (hasSuccess && hasMessage) {
                toast.success(response.data.message);
            }
            if (!hasSuccess && hasMessage) {
                toast.info(response.data.message);
            }
            return response;
        },
        err => {
            if (
                err.config.hasOwnProperty("errorHandle") &&
                err.config.errorHandle === false
            ) {
                return Promise.reject(err);
            }
            switch (err.response.status) {
                case 401:
                    if (err.response.data.message) {
                        toast.error(err.response.data.message);
                    } else {
                        toast.error("Unauthorized Action");
                    }
                    break;
                case 404:
                    let hasSuccess = _.some(err.response, error =>
                        _.has(error, "success")

                    );
                    let hasMessage = _.some(err.response, error =>
                        _.has(error, "message")
                    );
                    if (hasSuccess && hasMessage) {
                        toast.info(err.response.data.message);
                    }
                    // if (!hasSuccess && hasMessage) {
                    //     toast.error(err.response.data.message);
                    // }
                    if (!hasSuccess) {
                        toast.error("Ehh, It is not available right now.");
                    }
                    break;
                case 405:
                    toast.error("Method Not Allowed");
                    break;
                case 406:
                    toast.error("Media Type not acceptable");
                    break;
                case 422:
                    _.forEach(err.response.data.errors, err =>
                        toast.error(err[0])
                    );
                    break;
                case 429:
                    toast.error("Too Many Attempts");
                    break;
                case 500:
                    toast.error(
                        "Oh Snap ! , We are experiencing an error currently :("
                    );
                    break;
                default:
                    toast.error("Uhmm, We could not handle this request");
                    break;
            }
            return Promise.reject(err);
        }
    );
}
