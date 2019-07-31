import 'izitoast/dist/css/iziToast.min.css'
import iZtoast from 'izitoast'

export const toast = {
    error: (message, title = 'Error') => {
        return iZtoast.error({
            title: title,
            message: message,
            position: 'bottomLeft',
            closeOnEscape : true,
            closeOnClick : true
        });
    },
    success: (message, title = 'Success') => {
        return iZtoast.success({
            title: title,
            message: message,
            position: 'bottomLeft',
            closeOnEscape : true,
            closeOnClick : true

        });
    },
    info: (message, title = 'info') => {
        return iZtoast.info({
            title: title,
            message: message,
            position: 'bottomLeft',
            closeOnEscape : true,
            closeOnClick : true

        });
    },
    warning: (message, title = 'Warning') => {
        return iZtoast.warning({
            title: title,
            message: message,
            position: 'bottomLeft',
            closeOnEscape : true,
            closeOnClick : true

        });
    },
};
