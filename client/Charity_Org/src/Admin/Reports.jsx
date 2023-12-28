

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import "./Reports.css"

function Reports() {
    
    const [type,settype] = useState('')
    const [mindate,setmindate] = useState('')
    const [maxdate,setmaxdate] = useState('')
    const [aidcount,setaidcout] = useState(0)
    const [tq,settq] = useState([])
    const [ar2,setar2] = useState([])
    const [report1,setreport1] = useState([])
    const [report2,setreport2] = useState([])

    const [pr1,setpr1] = useState([])
    const [pr2,setpr2] = useState([])
    const [pr3,setpr3] = useState([])
    
    const [populated,setpopulated] = useState(false)

    const [popUpB,setPopUpB] = useState(false)
    const [populatedB,setPopulatedB] = useState(false)

    const [popUpA,setPopUpA] = useState(false)
    const [populatedA,setPopulatedA] = useState(false)
    
    function showreport()
    {
        
        if(mindate!='')
        {
            if(type=="report1")
            {
                setPopUpA(true)
            }
            if(type=="report2")
            {
                setPopUpB(true)
            }
        }
    }

    function reset() {
        setPopUpB(false)
        setPopUpA(false)
        
    }
    useEffect(() => {
        if(mindate!='')
        {
        let dt = new Date(mindate);
        dt.setMonth(dt.getMonth() + 1)
        console.log(dt)
        let c = format(dt, 'yyyy-MM-dd'); 
        setmaxdate(c)

        console.log(mindate)
        console.log(maxdate)
        }
    },[mindate])

    useEffect(() => {
        if(popUpA) {
            
            let addedB = {"mindate": mindate,"maxdate":maxdate}
            
            fetch("/api/Admin/pr1", {
                method: "POST",
                body:  JSON.stringify(addedB),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{ return response.json()})
            .then((data)=>{
                setpr1(JSON.parse(data))
                console.log(JSON.parse(data))
            })

            fetch("/api/Admin/pr2", {
                method: "POST",
                body:  JSON.stringify(addedB),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})
            .then((data)=>{
                setpr2(JSON.parse(data))
                console.log(JSON.parse(data))
            })

            fetch("/api/Admin/pr3", {
                method: "POST",
                body:  JSON.stringify(addedB),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})
            .then((data)=>{
                setpr3(JSON.parse(data))
                console.log(JSON.parse(data))
            })
            
            setPopulatedB(false)

        }
    },[popUpA])

    useEffect(() => {
        if(popUpB) {


            let addedB = {"mindate": mindate,"maxdate":maxdate}
           
            fetch("/api/Admin/aidcount", {
                method: "POST",
                body:  JSON.stringify(addedB),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{ return response.json()})
            .then((data)=>{
                setaidcout(JSON.parse(data))
                console.log(JSON.parse(data))
            })

            fetch("/api/Admin/ar2", {
                method: "POST",
                body:  JSON.stringify(addedB),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{ return response.json()})
            .then((data)=>{
                setar2(JSON.parse(data))
                console.log(JSON.parse(data))
            })
            

            fetch("/api/Admin/get_tq")
                .then((response)=>{return response.json()})
                .then((data)=>{
                  settq(JSON.parse(data))
                  console.log(JSON.parse(data))
                })
            

        }
    },[popUpB])

    return (

    <div id='mbut'>
        <div id='mainrep'>
            <div>
                <label htmlFor='Type'>Report Type </label>
                    <select name="Type" value={type} onChange={(e) => settype(e.target.value)}>
                        <option value="" disabled>Select Report Type</option>
                        <option value="report1" >Participation Report</option>
                        <option value="report2">Monthly assets report</option>
                    </select>
            </div>

            <div>
                <label htmlFor='Type'>Month</label>
                <input type="date" id="date" value={mindate} onChange={(e) => setmindate(e.target.value)} required/>
            </div>
            
        </div>
        <div >
            <button type="button" onClick={showreport} >Show Report</button>
        </div>
        
        { 
        popUpA &&
        <div id='popUpA'>
            <h2>participation report</h2>
            <div id='teamData'>
                <div id='tableHead'>
                    <div className='benfText idtable'>Team ID</div>
                    <div className='benfText'>Participations</div>
                    <div className='benfText'>Individual Points</div>
                    <div className='benfText'>Team Points</div>
                </div>
                <div id='beneficiaries'>
                    {pr1.map((member,key) => (
                        <div className='member' key={key}>
                            <div className='benfText idtable'>{member.TeamID}</div>
                            <div className='benfText'>{member.Participations}</div>
                        </div>
                    ))}
                    {pr2.map((member,key) => (
                        <div className='member' key={key}>
                            <div className='benfText idtable'>{member.Individual}</div>
                        </div>
                    ))}
                    {pr3.map((member,key) => (
                        <div className='member' key={key}>
                            <div className='benfText idtable'>{member.TPoints}</div>
                        </div>
                    ))}
                </div>
            </div>
            
            <button type="button" onClick={() => reset()}>Eshta</button>
            
        </div>
        }


        { 
        popUpB &&
        <div id='popUpReport1'>
            <h2>monthly assets report</h2>
            <div id="Data">
            <div className="Fields">
                <div className="inFields">
                    <p>Aids:</p>
                    <p>{aidcount.count}</p>   
                </div>
                <div className="inFields">
                    <p>Quantity Handed Out</p>
                    <div id='teamData'>
                        <div id='tableHead'>
                            <div className='benfText idtable'>Type</div>
                            <div className='benfText'>Total Quantity</div>
                        </div>
                        <div id='beneficiaries'>
                            {ar2.map((member,key) => (
                                <div className='member' key={key}>
                                    <div className='benfText idtable'>{member.A_Type}</div>
                                    <div className='benfText'>{member.quantity}</div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                       
                </div> 
            </div>
            <div className="Fields">
                <div className="inFields">
                      
                </div>
                <div className="inFields">
                    <p>Quantity Left</p>
                    <div id='teamData'>
                        <div id='tableHead'>
                            <div className='benfText idtable'>Type</div>
                            <div className='benfText'>Total Quantity</div>
                        </div>
                        <div id='beneficiaries'>
                            {tq.map((member,key) => (
                                <div className='member' key={key}>
                                    <div className='benfText idtable'>{member.D_Type}</div>
                                    <div className='benfText'>{member.Quantity}</div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div>   
                  
            </div>
        </div>

        <button type="button" onClick={() => reset()}>Tmam</button>

        </div>
        }

    </div>

    )
  }
  
  export default Reports