
import { useEffect, useState } from 'react'

import Navbar_H from "./Navbar_H"
import Account from "./Account"
import Team from "./Team"
import Aid from "./Aid"
import Events from './Events'
import Reports from './Reports'
import "./Leader.css"

function Leader(props) {
    
    const [select,setSelect] = useState(0)
    const Select = (num) => setSelect(num)

    const [volunteers,setVolunteers] = useState([{key:0,"id": "V_19956", "name": "tofa Ahmad","points":1000000,"phone":"01026908100",best:true},{key:1,"id": "V_156", "name": "Salah Mohamed","points":77777,"phone":"01026908200",best:false},{key:2,"id": "H_19956", "name": "tofa Ahmad","points":19988,"phone":"01026908100",best:false}])

    

    return (

    <div id="Head">
        <Navbar_H select={Select}/>
        {select==0 && <Reports/>}
        {select==2 && <Aid/>}
        {select==1 && <Team volunteers={volunteers} setVolunteers={setVolunteers}/>}
        {select==3 && <Events volunteers={volunteers} setVolunteers={setVolunteers}/>}
        {select==4 && <Account view={props.view}/>}
    </div>

    )
  }
  
  export default Leader