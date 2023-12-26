

import { useEffect, useState } from 'react'


function Reports() {
    
    const [type,settype] = useState('')
    const [populated,setpopulated] = useState(false)

    function showreport()
    {
        setpopulated(true)
        
        if(fname.trim().length === 0) {
            setpopulated(false)
        }
        if(lname.trim().length === 0) {
            setpopulated(false)
        }
    }
    return (

    <div>
        <div>
             <label htmlFor='Type'>Report Type</label>
                <select name="Type" value={type} onChange={(e) => settype(e.target.value)}>
                    <option value="food">Food</option>
                    <option value="clothes">Clothes</option>
                    <option value="medicine">Medicine</option>
                    <option value="blankets">Blankets</option>
                    <option value="books">Books</option>
                    <option value="money">Money</option>
                </select>
        </div>

        <div>
             <label htmlFor='Type'>Month</label>
                <select name="Type" value={type} onChange={(e) => settype(e.target.value)}>
                    <option value="food">Food</option>
                    <option value="clothes">Clothes</option>
                    <option value="medicine">Medicine</option>
                    <option value="blankets">Blankets</option>
                    <option value="books">Books</option>
                    <option value="money">Money</option>
                </select>
        </div>
        <button type="button" onClick={showreport}>Show Report</button>
        
    </div>

    )
  }
  
  export default Reports