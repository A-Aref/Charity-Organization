
import { useEffect, useState } from 'react'

import Navbar_H from "./Navbar_H"
import Account from "./Account"
import Team from "./Team"
import Aid from "./Aid"
import Events from './Events'
import "./Leader.css"

function Leader(props) {
    
    const [select,setSelect] = useState(0)
    const Select = (num) => setSelect(num)

    const [volunteers,setVolunteers] = useState([])

    useEffect(() =>   {fetch("/api/leader/selectTeam", {
        method: "POST",
        body:  JSON.stringify(props.user),
        headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
    })
    .then((response)=>{return response.json()})
    .then((data)=>{
      setVolunteers(JSON.parse(data))
    })
    },[])

    return (

    <div id="Head">
        <Navbar_H select={Select}/>
        {select==0 && <Team volunteers={volunteers} setVolunteers={setVolunteers} user={props.user}/>}
        {select==1 && <Aid/>}
        {select==2 && <Events volunteers={volunteers} setVolunteers={setVolunteers} user={props.user}/>}
        {select==3 && <Account view={props.view} user={props.user}/>}
    </div>

    )
  }
  
  export default Leader