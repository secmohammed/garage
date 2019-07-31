import axios from 'axios'

export const actions = {
    async login({commit, dispatch}, payload){
        let res = await axios.post('users/login', payload);
        commit('SET_TOKEN',res.data.id)
        dispatch('getUser', res.data.userId)
        commit('SET_LOGGED_IN_STATUS', true)
        return res;
    },
    async getUser({commit}, userId) {
        let res = await axios.get(`/users/${userId}`)
        commit('SET_USER', res.data)
    },
    async logout({commit}){
        let res =  axios.post(`users/logout/`)
        commit('UNSET_LOGGED_IN_USER')
        commit('UNSET_TOKEN')
        commit('SET_LOGGED_IN_STATUS', false)
    },
    async register({commit}, payload) {
        return await axios.post('users', payload);
    },
    async index({commit}){
        let res = await axios.get('users')
        commit('SET_USERS',res.data)
        return res
    },
    async update({commit}, payload){
        let res =  await UserService.update(payload)
            commit('SET_USER', res.data.user)
    },
    async delete({commit}, payload){
        let res =  await UserService.destroy(payload)
        commit('UNSET_USER',payload)
        return res
    },
}
