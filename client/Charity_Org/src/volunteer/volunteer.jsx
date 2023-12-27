
import { useEffect, useState } from 'react'

import Navbar_V from "./Navbar_V"
import Account from "./Account"
import Participation from "./Participation"
import Events from './Events'
import "./volunteer.css"

function Volunteer(props) {
    
    const [select,setSelect] = useState(1)
    const Select = (num) => setSelect(num)

    const [volunteers,setVolunteers] = useState([])

    useEffect(() =>   {fetch("/api/volunteer/selectvolunteer", {
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
        <Navbar_V select={Select} user={props.user}/>
        
        {select==1 && <Participation user={props.user} setuser={props.setUser}/>}
        {select==0 && <Events user={props.user}/>}
        {select==2 && <Account view={props.view} user={props.user}/>}
 
    </div>

    )
  }
  
  export default Volunteer