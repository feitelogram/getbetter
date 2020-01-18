import React from 'react'
import {useSelector, useDispatch} from "react-redux"
import { Header, Container, List, Divider, Button } from 'semantic-ui-react'
import actions from '../redux/actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


    const AppointmentList = () => {


        const savedPlaces = useSelector(state => state.user.providers)
        const appointments = useSelector(state => state.user.appointments)
        const saveds = useSelector(state => state.user.saveds)
        const dispatch = useDispatch()

        const renderAppointments = () => {
            return appointments.map(appointment => {
                let saved = saveds.find(saveObj => saveObj.id === appointment.saved_id)
                let provider = savedPlaces.find(place => place.id === saved.provider_id)
                let string = "You have an appointment at " + provider.name + " on " + appointment.date +"."
                const handleRemove = () => {
                    let result = window.confirm("Are you sure you wish to delete this appointment?")
                    if(result){
                    MySwal.fire({title: "Appointment removed."})
                    dispatch(actions.removeAppointment(appointment.id))}
                }
                return <List.Item key={appointment.id}>
                    {string}
                <Button
                onClick={handleRemove}
                >Remove</Button>
                </List.Item>
            })
        }
        

        return (
            <Container text dividing="true" background="green">
            <Header as="h3" textAlign="center" content= "Here are your scheduled appointments:"/>
            <List bulleted>
                {appointments.length === 0 ? <List.Item>none</List.Item> : renderAppointments()}
                </List>
                <Divider/>
                </Container>
    
        )
    }

    export default AppointmentList