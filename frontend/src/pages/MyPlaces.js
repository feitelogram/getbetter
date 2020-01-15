import React from 'react'
import {useSelector} from "react-redux"
import Provider from "../components/Provider"
import { Header, Grid } from 'semantic-ui-react'
import AppointmentList from "../components/AppointmentList"
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

// const MySwal = withReactContent(Swal)

const MyPlaces = () => {

    const savedPlaces = useSelector(state => state.user.providers)
    const appointments = useSelector(state => state.user.appointments)
    // const saveds = useSelector(state => state.user.saveds)
    // const dispatch = useDispatch()

    // const appointmentList = () => {
    //     return appointments.map(appointment => {
    //         let saved = saveds.find(saveObj => saveObj.id === appointment.saved_id)
    //         let provider = savedPlaces.find(place => place.id === saved.provider_id)
    //         let string = "You have an appointment at " + provider.name + " on " + appointment.date +"."
    //         const handleRemove = () => {
    //             let result = window.confirm("Are you sure you wish to delete this appointment?")
    //             if(result){
    //             dispatch(actions.removeAppointment(appointment.id))}
    //         }
    //         return <List.Item>
    //             {string}
    //         <Button
    //         onClick={handleRemove}
    //         >Remove</Button>
    //         </List.Item>
    //     })
    // }

   
    
    

    return (
        <div>
             <Header as='h1' dividing textAlign="center" content="These are your Resources"/>
             <Header as='h2' dividing textAlign="center" content="You can also make an appointment here to visit one of your choices."/>
             <Header as='h3' dividing textAlign="center" content="Feel free to add or delete from this list. Your time is your own."/>
             {!appointments || appointments.length === 0 ? null
             
             : <AppointmentList/>}
             <Grid celled='internally' columns={3} stackable divided style={{ padding: '5em' }}>
             {!savedPlaces || savedPlaces.length===0  ?  <Header as='h3' textAlign="center" content="You currently have no saved places."/> : 
             savedPlaces.map(provider => <Grid.Column key={provider.id}><Provider provider={provider} key={provider.id} saved={true}/></Grid.Column>)
             }
             </Grid>
             
               
            
        </div>
    )
}

export default MyPlaces
