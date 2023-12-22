
import { useEffect, useState } from 'react'

import Navbar_H from "./Navbar_H"
import Account from "./Account"
import Team from "./Team"
import Trans from "./trans"
import Events from './Events'
import Reports from './Reports'
import Leaders from './Leaders'


function Admin(props) {
    
    const [select,setSelect] = useState(0)
    const Select = (num) => setSelect(num)

    const [volunteers,setVolunteers] = useState([])

    // useEffect(() =>   {fetch("/api/leader/selectTeam", {
    //     method: "POST",
    //     body:  JSON.stringify(props.user),
    //     headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
    // })
    // .then((response)=>{return response.json()})
    // .then((data)=>{
    //   setVolunteers(JSON.parse(data))
    // })
    // },[])

    return (

    <div id="Head">
        <Navbar_H select={Select}/>
        {select==0 && <Reports/>}
        {select==1 && <Team volunteers={volunteers} setVolunteers={setVolunteers} user={props.user}/>}
        {select==2 && <Trans/>}
        {select==3 && <Events user={props.user}/>}
        {select==4 && <Account view={props.view} user={props.user}/>}
        {select==5 && <Leaders view={props.view} user={props.user}/>}
    </div>

    )
  }
  
  export default Admin