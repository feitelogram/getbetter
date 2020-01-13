import React from 'react'
import { Card, Button } from 'semantic-ui-react'
// import {Map, GoogleApiWrapper} from "google-maps-react"

const Provider = (props) => {
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
                <Button>Save to My Places</Button>
            </Card.Content>
        
        </Card>
    )
}

export default Provider
