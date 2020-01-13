const initialState = {providers: []}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_PROVIDERS":
            return {...state, providers: action.payload}
        default:
            return state
    }
}


export default reducer

