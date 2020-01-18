import React, {useState} from 'react'
import { Card, Button, Form, Header } from 'semantic-ui-react'
import userActions from '../redux/actions';
import {useSelector, useDispatch} from "react-redux"
// import {Map, GoogleApiWrapper} from "google-maps-react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const Provider = (props) => {

    const userId = useSelector(state => state.user.id)
    const dispatch = useDispatch()
    const saveds = useSelector(state => state.user.saveds)
    let savedProviders
    const [date, setDate] = useState({date: ""})
    let currentDate = date.date
    let saved 
    let appointments = useSelector(state => state.user.appointments)


    const addToSavedPlaces = () => {
        dispatch(userActions.makeSavedPlace(userId, props.provider.id))
        MySwal.fire({title: "Your resource has been saved.", footer: "You may see more info in 'Your Resources'"})
    }

    const removeFromSavedPlaces = () => {
        if(saveds){
            saved = saveds.find(saved => saved.provider_id === props.provider.id)
        }
        if(appointments){
            let appointmentSavedIds = appointments.map(appointment => appointment.saved_id)
            if(appointmentSavedIds.includes(saved.id)){
                MySwal.fire({title: "Please remove the resource from your saved places before trying to delete an appointment."})
                return ""
            }
        }
        let result = window.confirm("Are you sure you wish to remove this place?")
        if(result && saved){
            MySwal.fire({title: "Removed from Resources"})
            dispatch(userActions.removeSavedPlace(saved.id, props.provider.id))
        }
    }

    const handleChange = (e) => {
        setDate({ ...date, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        if(date === ""){
            MySwal.fire({title: "Please enter a time or day for your appointment."})
        } else {
        saved = saveds.find(saved => saved.provider_id === props.provider.id)
        dispatch(userActions.addAppointment(saved.id, date))
        setDate({date: ""})
        MySwal.fire({title: "Added to your Appointments"})
        }
    }

    const currentlySaved = () => {
        if(saveds){
            savedProviders = saveds.map(saved => saved.provider_id)
            if(savedProviders.includes(props.provider.id)){
                return <Button
                onClick={removeFromSavedPlaces}
                >Remove from My Places</Button>
                    } else {
                return <Button
                onClick= {addToSavedPlaces}
                >Save to My Places</Button>
                    }
        }
        
    }
    
    const map = () => {
        let first = "https://www.google.com/maps/embed/v1/place?q="
        let third = "&key=" + process.env.REACT_APP_API_KEY
        let address = first + props.provider.address + third
        return <iframe title="map" width="200" height="200" frameBorder="0" style={{border:"0"}} src= {address} allowFullScreen></iframe>
    }

    const appointForm = () => {
        return (
        <Form onSubmit={handleSubmit}>
         <Header as="h4" content="Choose a time for you to visit:"/>
    <Form.Field>
      <input
        type="text"
        name="date"
        value={currentDate}
        onChange={handleChange}
      />
      </Form.Field>
        <Button type="submit">Make an Appointment</Button>
        </Form>
        )}

    return (
        <Card color= "olive" raised={true} >
            <Card.Content>
            <Card.Header>
                {props.provider.name ? props.provider.name : "Open Meeting"}
            </Card.Header>
                <Card.Meta>
                {props.provider.address}
                </Card.Meta>
                <Card.Description>
                {props.provider.phone ? "Phone: " + props.provider.phone : null}
                </Card.Description>
                {props.provider.email ? <a href={"mailto:" + props.provider.email} target="_blank" rel="noopener noreferrer">Email</a>: null}
                <Card.Description>
                {props.provider.website ? <a href={props.provider.website} target="_blank" rel="noopener noreferrer" >Website</a> : null}
                </Card.Description>
                {currentlySaved()}
            </Card.Content>
            <Card.Content extra>
             {props.saved ? map() : null}
            </Card.Content>
            {props.saved ? appointForm() : null}
        </Card>
    )
}

export default Provider
