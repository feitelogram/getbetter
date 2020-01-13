const initialState = {
    user: {},
    providers: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
      case 'SET_USER':
        return {...state, user: payload}
      case 'CLEAR_USER':
        return {...state, user: {}};
      case 'SET_PROVIDERS':
          return {...state, providers: payload}
      case "SAVE_PLACE":
          return {...state, user: {...state.user, providers: [...state.user.providers, payload]}}
      default:
        return state;
    }
  };