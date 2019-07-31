export const mutations = {
    SET_USER(state, user) {
        state.user = user
    },
    SET_USERS(state, users) {
        state.users = users
    },
    UNSET_USER(state,user) {
        state.users = state.users.filter(u => user.id != u.id)
    },
    UNSET_LOGGED_IN_USER(state){
        state.user = null
    },
    UNSET_USERS(state) {
        state.users = null
    },
    SET_LOGGED_IN_STATUS(state,status) {
        state.loggedIn = status
    },
    SET_TOKEN(state, token) {
        state.token = token
    },
    UNSET_TOKEN(state) {
        state.token = null
    }
}
