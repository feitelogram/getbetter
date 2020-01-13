import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Nav from './components/Nav';
import userActions from "./redux/actions"
import {useDispatch} from "react-redux"


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.token) {
    dispatch(userActions.persistUser())
  }
  dispatch(userActions.getAllProviders())
}, [dispatch]
  )

  return (
    <Router>
      <Nav />
      <Routes />
    </Router>
  );
};

export default App;