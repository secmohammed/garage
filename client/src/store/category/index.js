import {actions} from './actions'
import {getters} from './getters'
import {mutations} from './mutations'
export const category = {
    state: {
        categories: []
    },
    getters,
    mutations,
    actions,
    namespaced: true
}
