import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions.js';
import {Form, Header, Button} from "semantic-ui-react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Signup = props => {
  // initializing dispatch
  const dispatch = useDispatch();

  // Setting up local state using the useState hook
  const [signupForm, setSignupForm] = useState({
    username: '',
    password: ''
  });

  // Controlled form functions
  const handleChange = e =>
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const { history } = props;
    userActions.newUserToDB(signupForm)
    .then(data => {
        if(data.errors) {
            MySwal.fire({title: "Signup error", footer: "Please pick a different username or password."})
        } else {
        dispatch(userActions.setUserAction(data.user));
        localStorage.setItem('token', data.token);
        history.push('/');
    }
    })};

  // Destructuring keys from our local state to use in the form
  const { username, password } = signupForm;

  // Component code
  return (
    <Form
      onSubmit={handleSubmit}>
      <Header as= "h1" textAlign= "center" content="Welcome to getBetter."/>
      <Header as="h3" textAlign="center" content="Please choose a username and a secure password."/>
      <Form.Field>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
        placeholder="Username"
      />
      </Form.Field>
      <Form.Field>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Password"
      />
      </Form.Field>
      <Button type="submit">Signup</Button>
    </Form>
  );
};

export default Signup;