export const mutations = {
    SET_EMERGENCIES(state, emergencies) {
        state.emergencies = emergencies
    },
    SET_USER_EMERGENCIES(state, emergencies) {
        state.userEmergencies = emergencies
    },
    PUSH_EMERGENCY(state, emergency){
        state.emergencies.push(emergency)
    },
    UNSET_EMERGENCIES(state) {
        state.emergencies = {}
    },
    UNSET_EMERGENCY(state, emergencyId){
        state.emergencies = state.emergencies.filter(emergency => emergency.id != emergencyId)
    },
    SET_USER_FILTERED_EMERGENCIES(state, payload) {
        if (payload instanceof Array) {
            payload.forEach(emergency => {
                if (state.userCategorizedEmergencies[emergency.status]) {
                    if (!state.userCategorizedEmergencies[emergency.status].find(e => e.id == emergency.id)) {
                        state.userCategorizedEmergencies[emergency.status].push(emergency)
                    }
                }else {
                    state.userCategorizedEmergencies[emergency.status] = [payload[0]]
                }
            })
        }

    },
    SET_FILTERED_EMERGENCIES(state, payload) {
        if (payload instanceof Array) {
            payload.forEach(emergency => {
                if (state.categorizedEmergencies[emergency.status]) {
                    if (!state.categorizedEmergencies[emergency.status].find(e => e.id == emergency.id)) {
                        state.categorizedEmergencies[emergency.status].push(emergency)
                    }
                }else {
                    state.categorizedEmergencies[emergency.status] = [payload[0]]
                }
            })
        }
    }

}
