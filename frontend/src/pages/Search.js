import React, {useState} from 'react'
import {useSelector} from "react-redux"
import Provider from "../components/Provider"
import DropdownSelect from '../components/DropdownSelect'
import { Header, Grid } from 'semantic-ui-react'
import Watson from "../components/Watson"



const Search = () => {
    let [filterValue, setFilterValue] = useState({filter: ""})
    let providers = useSelector(state => state.providers)
    let {filter} = filterValue
    const handleChange = (event, data) => {
    setFilterValue({ ...filterValue, filter: data.value })
    }
    const currentProviders = () => {
        switch(filter) {
            case("Therapy"):
                return providers.filter(provider => provider.category === "Therapy")
            case("Substances"):
                return providers.filter(provider => provider.category === "Substances")
            case("Intimacy"):
                return providers.filter(provider => provider.category === "Intimacy")
            case("Money"):
                return providers.filter(provider => provider.category === "Money")
            default:
                return []
        }
    }
    

    return (
        <div>
            <Header as='h1' dividing textAlign="center" content="Let's Find You Some Resources"/>
            <Header as='h3' dividing textAlign="center" content="All resources listed are low-cost, sliding-scale or free."/>
            <DropdownSelect dividing onChange={handleChange}/>
            {filter === "Substances" ? <Header as='h5' textAlign="center" content="The following is a list of open-beginners 12-step meetings. Feel free to reach out or visit."/>: null}
            <Grid celled='internally' columns={3} stackable divided style={{ padding: '5em' }}>
           {currentProviders().map(provider => <Grid.Column key={provider.id}><Provider provider={provider} key={provider.id}/></Grid.Column>)}
           </Grid>
           <Watson/>
        </div>
    )
}

export default Search
