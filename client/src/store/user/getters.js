export const getters = {
    getUser(state){
        return state.user
    },
    getLoggedInStatus(state){
        return state.loggedIn
    },
    getUsers(state){
        return state.users
    },
    getToken(state) {
        return state.token
    },
    getUserById: (state) => (id) => state.users.find(user => user.id == id)
}
