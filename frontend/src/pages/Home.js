import React from 'react';
import { useSelector } from 'react-redux';
import InlineStyle from '../styles/InlineStyle';
import {Container, Header, Image} from "semantic-ui-react"
import bears from "../images/bears.jpg"


const Home = () => {
  const username = useSelector(state => state.user.username);
  const text = username ? (
    <h1>Welcome back to getBetter, {username} </h1>
  ) : (
    <h1>Welcome to getBetter. Please login or sign-up to start. </h1>
    
  );
  return <div>
          <InlineStyle/>
          <Container text>
          <Header as='h1' dividing content={text}>
      </Header>
      </Container>
      <Container text textAlign= "center">
      <Image bordered rounded size='large' src={bears} />
          <p> getBetter is a tool for finding low-cost mental health and wellness options.
              It uses both sliding scale and free resources.
              getBetter neither endorses nor disparages any place listed.
              Every person finds the help that works for them, so feel free to try a few places and see what works for you. </p>
      </Container>
  </div>;
};

export default Home;