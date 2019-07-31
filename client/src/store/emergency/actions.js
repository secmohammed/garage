import axios from 'axios'

export const actions = {
    async index({commit}) {
        let res = await axios.get('emergencies')
        commit('SET_EMERGENCIES',res.data)
        commit('SET_FILTERED_EMERGENCIES', res.data)

    },
    async userEmergencies({commit,rootGetters}, status = null) {
        if (status) {
            let res = await axios.get(`/users/${rootGetters['user/getUser'].id}/posted-emergencies?filter={"where": {"status": "${status}"}}`)
            commit('SET_USER_FILTERED_EMERGENCIES', res.data)
        }else{
            let res = await axios.get(`/users/${rootGetters['user/getUser'].id}/posted-emergencies`)
            commit('SET_USER_EMERGENCIES',res.data)
            commit('SET_USER_FILTERED_EMERGENCIES', res.data)
        }
    },

}
