import {actions} from './actions'
import {getters} from './getters'
import {mutations} from './mutations'
export const user = {
    state: {
        users: [],
        loggedIn: false,
        user: null,
        token: null,
    },
    getters,
    mutations,
    actions,
    namespaced: true
}
