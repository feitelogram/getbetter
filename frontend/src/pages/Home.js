import React from 'react';
import { useSelector } from 'react-redux';
import InlineStyle from '../styles/InlineStyle';
import {Container, Header, Image, Grid} from "semantic-ui-react"
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
          <Header as='h1' textAlign="center" dividing content={text} style={{ padding: '1em' }}>
      </Header>
      </Container>
      <Container text textAlign= "center">
      <Image style={{ padding: '1em' }} bordered rounded dividing size='large' src={bears} />
      <Grid.Row style={{ padding: '3em' }}>
          <p> getBetter is a tool for finding low-cost mental health and wellness options.
              It uses both sliding scale and free resources.
              getBetter neither endorses nor disparages any place listed.
              Every person finds the help that works for them, so feel free to try a few places and see what works for you. </p>
      </Grid.Row>
      </Container>
  </div>;
};

export default Home;