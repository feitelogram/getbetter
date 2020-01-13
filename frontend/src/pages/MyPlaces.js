import React, {useState} from 'react'
import {useSelector} from "react-redux"
import Provider from "../components/Provider"
import { Header, Grid } from 'semantic-ui-react'

const MyPlaces = () => {

    const savedPlaces = useSelector(state => state.user.providers)

    return (
        <div>
             <Header as='h1' dividing textAlign="center" content="These are your Resources"/>
             <Header as='h3' dividing textAlign="center" content="Feel free to add or delete from this list. Your time is your own."/>
             <Grid celled='internally' columns={3} stackable divided style={{ padding: '5em' }}>
             {savedPlaces ? savedPlaces.map(provider => <Grid.Column key={provider.id}><Provider provider={provider} key={provider.id} saved={true}/></Grid.Column>) : null}
             </Grid>
        </div>
    )
}

export default MyPlaces
