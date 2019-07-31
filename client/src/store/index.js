import Vue from 'vue';
import Vuex from 'vuex';

import layout from './layout';
import {user} from './user'
import {category} from './category'
import {emergency} from './emergency'
Vue.use(Vuex);

export default new Vuex.Store({
    // namespaced: true,
    modules: {
        layout,
        user,
        category,
        emergency
    },
});
