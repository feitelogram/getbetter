const BASE_URL = 'http://localhost:3000';
const USERS_URL = BASE_URL + '/users';
const PERSIST_URL = BASE_URL + '/persist';
const LOGIN_URL = BASE_URL + '/login';
const PROVIDERS_URL = BASE_URL + "/providers"
const SAVEDS_URL = BASE_URL + "/saveds"
const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;
const SPECIFIC_SAVED_URL = id => SAVEDS_URL + '/' + id;
const APPOINTMENTS_URL = BASE_URL + "/appointments"
const SPECIFIC_APPOINTMENT_ID = id => APPOINTMENTS_URL + "/" + id

// Redux Actions

const setUserAction = userObj => {
    // console.log(userObj)
    return {
  type: 'SET_USER',
  payload: userObj
}};

const clearUserAction = () => ({
  type: 'CLEAR_USER'
});

const setProvidersAction = providersArr => ({
    type: "SET_PROVIDERS",
    payload: providersArr
})

const addSavedPlaceAction = savedPlace => ({
    type: "SAVE_PLACE",
    payload: savedPlace
})

const removePlaceAction = (savedId, providerId) => ({
    type: "REMOVE_PLACE",
    payload: {savedId: savedId, providerId: providerId}
})

const addAppointmentAction = (appointObj) => ({
    type: "ADD_APPOINTMENT",
    payload: appointObj
})

const removeAppointmentAction = id => ({
    type: "REMOVE_APPOINTMENT",
    payload: id
})

// Fetch

const newUserToDB = userObj => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  };
  return fetch(USERS_URL, config)
    .then(r => r.json())
};

const deleteUserFromDB = userId => dispatch => {
  const config = {
    method: 'DELETE'
  };
  fetch(SPECIFIC_USER_URL(userId), config).then(r => {
    dispatch(clearUserAction());
    localStorage.clear();
  });
};

const loginUserToDB = userCredentials => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredentials)
  };
  return fetch(LOGIN_URL, config)
    .then(r => r.json())
};

const persistUser = () => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: `bearer ` + localStorage.token
    }
  };
  fetch(PERSIST_URL, config)
    .then(r => r.json())
    .then(userInstance => {
      dispatch(setUserAction(userInstance));
    });
};

const logoutUser = () => dispatch => {
  dispatch(clearUserAction());
  localStorage.clear();
};

const getAllProviders = () => dispatch => {
    fetch(PROVIDERS_URL)
    .then(resp => resp.json())
    .then(providersArr => {
        dispatch(setProvidersAction(providersArr))
    })
}

const makeSavedPlace = (userId, providerId) => dispatch => {
    fetch(SAVEDS_URL, {
      method:'POST',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
     body: JSON.stringify({
    user_id: userId,
    provider_id: providerId
      })
    })
    .then(resp => resp.json())
    .then(savedPlace => {
        dispatch(addSavedPlaceAction(savedPlace))
    })
}

const removeSavedPlace = (savedId, providerId) => dispatch => {
    fetch(SPECIFIC_SAVED_URL(savedId), {
      method:'DELETE',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
    })
    .then(resp => resp.json())
    .then(empty => {
        dispatch(removePlaceAction(savedId, providerId))
    })
}

const addAppointment = (savedId, dateObj) => dispatch => {
    fetch(APPOINTMENTS_URL, {
      method:'POST',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
     body: JSON.stringify({
    saved_id: savedId,
    date: dateObj.date
      })
    })
    .then(resp => resp.json())
    .then(appointmentObj => {
        dispatch(addAppointmentAction(appointmentObj))
    })
}

const removeAppointment = appointmentId => dispatch => {
    fetch(SPECIFIC_APPOINTMENT_ID(appointmentId), {
      method:'DELETE',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
    })
    .then(resp => resp.json())
    .then(empty => {
        dispatch(removeAppointmentAction(appointmentId))
    })
}


export default {
  newUserToDB,
  deleteUserFromDB,
  loginUserToDB,
  persistUser,
  logoutUser,
  getAllProviders,
  makeSavedPlace,
  removeSavedPlace,
  setUserAction,
  addAppointment,
  removeAppointment
};