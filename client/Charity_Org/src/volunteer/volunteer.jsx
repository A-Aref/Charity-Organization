
import { useEffect, useState } from 'react'

import Navbar_V from "./Navbar_V"
import Account from "./Account"
import Participation from "./Participation"
import Events from './Events'
import "./volunteer.css"

function Volunteer(props) {
    
    const [select,setSelect] = useState(0)
    const Select = (num) => setSelect(num)

    const [volunteers,setVolunteers] = useState([{key:0,"id": "V_19956", "name": "tofa Ahmad","points":1000000,"phone":"01026908100",best:true},{key:1,"id": "V_156", "name": "Salah Mohamed","points":77777,"phone":"01026908200",best:false},{key:2,"id": "H_19956", "name": "tofa Ahmad","points":19988,"phone":"01026908100",best:false}])

    

    return (

    <div id="Head">
        <Navbar_V select={Select} user={props.user}/>
        
        {select==1 && <Participation user={props.user}/>}
        {select==0 && <Events/>}
        {select==2 && <Account view={props.view} user={props.user}/>}
 
    </div>

    )
  }
  
  export default Volunteer