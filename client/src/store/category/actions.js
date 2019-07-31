import axios from 'axios'

export const actions = {
    async index({commit}) {
        let res = await axios.get('/emergency-categories')
        commit('SET_CATEGORIES',res.data)
    },
    async store({commit}, payload) {
        let res = await axios.post('/emergency-categories',payload)
        commit('PUSH_CATEGORY',res.data)

    },
    async update({commit}, payload) {
        let res = await axios.patch(`/emergency-categories/${payload.id}`, {
            name: payload.name
        })
        commit('UNSET_CATEGORY',payload)
        commit('PUSH_CATEGORY', payload)
    }
}
