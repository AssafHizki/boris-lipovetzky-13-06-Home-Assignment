export const noteReducer = (state = [], action) => {
    if (action.type === "new_note") {
        return state.concat(action.payload)
    }
    return state
}