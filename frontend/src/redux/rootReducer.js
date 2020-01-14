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
          return {...state, user: {...state.user, 
            providers: [...state.user.providers, payload.provider],
            saveds: [...state.user.saveds, payload]
        }}
      case "REMOVE_PLACE":
          return {...state, user: {...state.user, 
            providers: state.user.providers.filter(provider => provider.id !== payload.providerId),
            saveds: state.user.saveds.filter(saved => saved.id !== payload.savedId)
        }}
      case "ADD_APPOINTMENT":
          return {...state,
              user: {...state.user,
                appointments: [...state.user.appointments, payload]
              }
          }
      case "REMOVE_APPOINTMENT":
          return {...state,
            user: {...state.user,
                appointments: state.user.appointments.filter(appointment => appointment.id !== payload)
            }
        }
      default:
        return state;
    }
  };