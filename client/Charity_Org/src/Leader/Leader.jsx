
import Navbar_H from "./Navbar_H"
import Account from "./Account"
import Team from "./Team"
import Aid from "./Aid"
import { useEffect, useState } from 'react'
import "./Leader.css"

function Leader() {
    
    const [select,setSelect] = useState(0)

    function Select (num) {
        setSelect(num)
    }
    

    return (

    <div id="Head">
        <Navbar_H select={Select}/>
        {select==1 && <Team/>}
        {select==2 && <Aid/>}
        {select==5 && <Account/>}
    </div>

    )
  }
  
  export default Leader