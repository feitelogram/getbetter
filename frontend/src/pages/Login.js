import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';
import { Form, Header, Button } from 'semantic-ui-react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const LoginPage = props => {
  // initializing dispatch
  const dispatch = useDispatch();
  // Setting up local state using the useState hook
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  // controlled form functions
  const handleSubmit = e => {
    e.preventDefault();
    userActions.loginUserToDB(loginForm)
    .then(data => {
        if(data.errors) {
            MySwal.fire({title: "Login not found.", footer: "Check your password, try again or signup."})
        } else {
            MySwal.fire({title: "Login successful.", footer: "Welcome back to getBetter."})
        dispatch(userActions.setUserAction(data.user));
        localStorage.setItem('token', data.token);
        props.history.push('/');
    }
    })};

  const handleChange = e =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  // Destructuring keys from our local state to use in the form
  const { username, password } = loginForm;

  // Component code
  return (
      <Form
      onSubmit={handleSubmit}>
      <Header as= "h1" textAlign= "center" content="Please login to continue or signup if you're new."/>
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
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default LoginPage;