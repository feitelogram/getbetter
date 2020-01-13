import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import userActions from '../redux/actions';
import {useSelector, useDispatch} from "react-redux"
// import {Map, GoogleApiWrapper} from "google-maps-react"

const Provider = (props) => {

    const userId = useSelector(state => state.user.id)
    const dispatch = useDispatch()
    const saveds = useSelector(state => state.user.saveds)
    let savedProviders = saveds.map(saved => saved.provider_id)

    const addToSavedPlaces = () => {
        dispatch(userActions.makeSavedPlace(userId, props.provider.id))
        alert("Your place has been saved.")
    }

    const removeFromSavedPlaces = () => {
        let saved = saveds.find(saved => saved.provider_id === props.provider.id)
        let result = window.confirm("Are you sure you wish to remove this place?")
        if(result && saved){
            dispatch(userActions.removeSavedPlace(saved.id, props.provider.id))
            alert("This place has been removed.")
        }
    }

   

    const currentlySaved = () => {
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
    
    const map = () => {
        let first = "https://www.google.com/maps/embed/v1/place?q="
        let third = "&key=" + process.env.REACT_APP_API_KEY
        let address = first + props.provider.address + third
        return <iframe title="map" width="250" height="200" frameBorder="0" style={{border:"0"}} src= {address} allowFullScreen></iframe>
    }

    return (
        <Card>
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
        
        </Card>
    )
}

export default Provider
