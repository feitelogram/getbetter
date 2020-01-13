import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions';

const Nav = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };
  const username = useSelector(state => state.user.username)
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-evenly', padding: "1em" }}>
      <Link to="/">Home</Link>
      {username ? null : <Link to="/signup">Signup</Link> }
      {username ? null : <Link to="/login">Login</Link>}
      {username ? <Link to="/search">Search</Link> : null }
      {username ? <Link to="/saveds">Your Resources</Link> : null }
      {username ?  <Link to="/" onClick={handleLogout}>Logout</Link> : null}
      {username ? "Welcome, " + username : null}
    </nav>
  );
};

export default Nav;