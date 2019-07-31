// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'expose-loader?jQuery!jquery' // eslint-disable-line
import 'expose-loader?$!jquery' // eslint-disable-line
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueTouch from 'vue-touch';
import Trend from 'vuetrend';
import axios from 'axios'
import store from './store';
import router from './Routes';
import App from './App';
import interceptorsSetup from "./interceptors.js";
import VueChartkick from 'vue-chartkick'

Vue.use(VueChartkick)
window._ = require("lodash");
import { toast } from "./services/toast";


import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
window.toast = toast;


axios.defaults.baseURL = 'http://nouni.herokuapp.com/api';

window.axios = axios
window.store = store

Vue.use(BootstrapVue);

Vue.use(VueTouch);

Vue.use(Trend);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.forVisitors)) {
        if (store.getters["user/getLoggedInStatus"]) {
            next({
                path: "/app"
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.forAuth)) {

        if (store.getters["user/getLoggedInStatus"]) {
            next();
        } else {
            next({
                path: "/login"
            });
        }
    } else {
        next();
    }
});


interceptorsSetup();


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
