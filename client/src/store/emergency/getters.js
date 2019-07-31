export const getters = {
    getEmergencies(state){
        return state.emergencies
    },
    getEmergenciesByStatus: (state) => (status) => state.categorizedEmergencies[status],
    getUserEmergenciesByStatus: (state) => (status) => state.userCategorizedEmergencies[status]

}
