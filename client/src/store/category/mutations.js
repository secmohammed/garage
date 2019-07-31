export const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories
    },
    UNSET_CATEGORIES(state) {
        state.categories = null
    },
    PUSH_CATEGORY(state, category){
        state.categories.push(category)
    },
    UNSET_CATEGORY(state, category){
        state.categories = state.categories.filter(c => c.id != category.id)
    }
}
