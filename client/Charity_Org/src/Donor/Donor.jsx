
import { useEffect, useState } from 'react'

import Navbar_D from "./Navbar_D"
import Account from "./Account"
import Donations from "./Donations"
import Events from './Events'
import "./Donor.css"

function Donor(props) {
    
    const [select,setSelect] = useState(0)
    const Select = (num) => setSelect(num)

    

    

    return (

    <div id="Head">
        <Navbar_D select={Select}/>
        
        {select==0 && <Donations user={props.user}/>}
        {select==1 && <Events user={props.user}/>}
        {select==2 && <Account view={props.view} user={props.user}/>}
 
    </div>

    )
  }
  
  export default Donor