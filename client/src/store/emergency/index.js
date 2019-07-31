import {actions} from './actions'
import {getters} from './getters'
import {mutations} from './mutations'
export const emergency = {
    state: {
        emergencies: [

        ],
        categorizedEmergencies: {
            expired: [],
            pending: [],
            inProgress: [],
            completed: []
        },
        userCategorizedEmergencies:{
            expired: [],
            pending: [],
            inProgress: [],
            completed: []

        },
        userEmergencies: [
        ]
    },
    getters,
    mutations,
    actions,
    namespaced: true
}
