import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import InlineStyle from '../styles/InlineStyle';
import {Container, Header, Image, Grid} from "semantic-ui-react"
import bears from "../images/bears.jpg"
import AppointmentList from "../components/AppointmentList"
// import Watson from "../components/Watson"

const Home = () => {
  // const WATSON_URL = "http://localhost:3000/watsonapi"
  const username = useSelector(state => state.user.username);
  const appointments = useSelector(state => state.user.appointments)
  let string = "Welcome back to getBetter, " + username
  const text = username ? string : "Welcome to getBetter. Please login or sign-up to start."

const demoWatson = () => {
  window.loadWatsonAssistantChat({
    integrationID: process.env.REACT_APP_INTEGRATION, // The ID of this integration.
    region: "us-south" // The region your integration is hosted in.
  }).then( (instance) => {
    instance.render()
  }
  
    // instance.render();
  );
}

useEffect(() => {
  demoWatson()
}, []


)


  return <div>
          <InlineStyle/>
          <Container text>
          <Header as='h1' textAlign="center" dividing content={text} style={{ padding: '1em' }}>
      </Header>
      </Container>
      <Container text textAlign= "center" style={{padding: ".5em"}}>
      {!appointments || appointments.length === 0 ? null: <AppointmentList/>}
                 
      <Image style={{ padding: '1em' }} bordered rounded size='big' src={bears} />
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