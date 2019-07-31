import { SERVICE_CHANGED, DESCRIPTION_CHANGED } from "./types";

export const serviceChanged = service => {
    return {
        type: SERVICE_CHANGED,
        payload: service
    };
};
export const descriptionChanged = description => {
    return {
        type: DESCRIPTION_CHANGED,
        payload: description
    };
};
