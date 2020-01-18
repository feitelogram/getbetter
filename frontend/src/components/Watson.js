import React, { useEffect } from 'react'
import {Widget, addResponseMessage} from "react-chat-widget"
import 'react-chat-widget/lib/styles.css';


const Watson = () => {

    useEffect(() => {
      addResponseMessage("Hello, welcome to getBetter! In order to gain access to the site, you need to be logged-in or signup. So feel free to ask me for help with either of those things!")  
    },[]
    )

    const WATSON_URL = "http://localhost:3000/watsonapi"

    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        fetch(WATSON_URL, {
          method:'POST',
         headers: { 
             'Content-type': 'application/json',
             'accept': 'application/json'
         },
         body: JSON.stringify({
        message: newMessage
          })
        })
        .then(resp => resp.json())
        .then(r => addResponseMessage(r.text))
      }




    return (
        <div>
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          title="Welcome to getBetter"
          subtitle= "Feel free to use this bot to find help."
        />        
        </div>
    )
}

export default Watson
