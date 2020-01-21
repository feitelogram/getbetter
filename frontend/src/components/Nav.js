import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions';
import { Menu } from 'semantic-ui-react';

const Nav = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };
  const username = useSelector(state => state.user.username)
  return (
    <Menu fluid color="purple" inverted widths={5}>
      <Menu.Item as={Link} to="/" name="Home"/>
      {username ? null : <Menu.Item as={Link} to="/signup" name="Signup"/> }
      {username ? null : <Menu.Item as={Link} to="/login" name="Login"/>}
      {username ? <Menu.Item as={Link} to="/search" name="Search"/> : null }
      {username ? <Menu.Item as={Link} to="/saveds" name="Your Resources"/>: null }
      {username ?  <Menu.Item as={Link} to="/" name="Logout" onClick={handleLogout}/>: null}
      {username ? <Menu.Item style={{align: "right"}} name="welcome" content= {"Welcome back, " + username}/> : null}
    </Menu>
  );
};

export default Nav;