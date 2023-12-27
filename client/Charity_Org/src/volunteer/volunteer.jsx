
import { useEffect, useState } from 'react'

import Navbar_V from "./Navbar_V"
import Account from "./Account"
import Participation from "./Participation"
import Events from './Events'
import "./volunteer.css"

function Volunteer(props) {
    
    const [select,setSelect] = useState(1)
    const Select = (num) => setSelect(num)
    const [eventconfirm,seteventconfirm] = useState(true)
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

    useEffect(() =>   {fetch("/api/volunteer/checkevent", {
        method: "POST",
        body:  JSON.stringify({V_ID:props.user.V_ID,E_ID:props.user.Event_Request}),
        headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
    })
    .then((response)=>{return response.json()})
    .then((data)=>{
        console.log(data)
      if(data === "no events found"){
        seteventconfirm(true)
      }
      else{
        seteventconfirm(false)
      }
    })
    },[])

    

    return (

    <div id="Head">
        <Navbar_V select={Select} user={props.user} eventconfirm ={eventconfirm}/>
        
        {select==1 && <Participation user={props.user} setuser={props.setUser}/>}
        {select==0 && <Events select={Select} user={props.user} seteventconfirm ={seteventconfirm}/>}
        {select==2 && <Account view={props.view} user={props.user}/>}
 
    </div>

    )
  }
  
  export default Volunteer