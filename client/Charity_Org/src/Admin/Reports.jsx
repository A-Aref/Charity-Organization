

import { useEffect, useState } from 'react'
import { format } from 'date-fns';

function Reports() {
    
    const [type,settype] = useState('')
    const [mindate,setmindate] = useState('')
    const [maxdate,setmaxdate] = useState('')
    const [aidcount,setaidcout] = useState(0)
    const [tq,settq] = useState([])
    const [report1,setreport1] = useState([])
    const [report2,setreport2] = useState([])
    
    const [populated,setpopulated] = useState(false)

    const [popUpB,setPopUpB] = useState(false)
    const [populatedB,setPopulatedB] = useState(false)

    const [popUpA,setPopUpA] = useState(false)
    const [populatedA,setPopulatedA] = useState(false)
    
    function showreport()
    {
        setpopulated(true)
        
        if(type=="report1")
        {
            setPopUpA(true);
        }
        if(type=="report2")
        {
            setPopUpB(true);
        }
    }

    useEffect(() => {
        if(popUpB) {
            let dt = new Date(mindate);
            dt.setMonth(dt.getMonth() + 1)

            let c = format(dt, 'yyyy-MM-dd'); 
            setmaxdate(c)
            console.log(c)
            console.log(mindate)


            // let addedB = {"mindate": mindate,"maxdate":maxdate}
            // setPopUpB(false)
            // fetch("/api/Admin/aidcount", {
            //     method: "POST",
            //     body:  JSON.stringify(addedB),
            //     headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            // })
            // .then((response)=>{return response.json()})
            // .then((data)=>{
            //     fetch("/api/Admin/selectleaders")
            //     .then((response)=>{return response.json()})
            //     .then((data)=>{
            //       setleaders(JSON.parse(data))
            //     })
            // })  

            // fetch("/api/Admin/get_tq")
            //     .then((response)=>{return response.json()})
            //     .then((data)=>{
            //       settq(JSON.parse(data))
            //       console.log(JSON.parse(data))
            //     })
            // setPopulatedC(false)

        }
    },[popUpB])

    return (

    <div>
        <div>
             <label htmlFor='Type'>Report Type </label>
                <select name="Type" value={type} onChange={(e) => settype(e.target.value)}>
                    <option value="report1">Participation Report</option>
                    <option value="report2">Monthly assets report</option>
                </select>
        </div>

        <div>
             <label htmlFor='Type'>Month</label>
             <input type="date" id="date" value={mindate} onChange={(e) => setmindate(e.target.value)} required/>
        </div>
        <button type="button" onClick={showreport}>Show Report</button>
        
        { 
        popUpA &&
        <div id='popUpA'>
            <h2>participation report</h2>
            <div id='teamData'>
                <div id='tableHead'>
                    <div className='benfText idtable'>Team ID</div>
                    <div className='benfText'>Participations</div>
                    <div className='benfText'>Points</div>
                </div>
                <div id='beneficiaries'>
                    {/* {leaders.map((member,key) => (
                        <div className='member' key={key}>
                            <div className='benfText idtable'>{member.V_ID}</div>
                            <div className='benfText'>{`${member.FName}  ${member.LName}`}</div>
                            <div className='benfText'>{member.Email}</div>
                        </div>
                    ))} */}
                </div>
            </div>
            
        
            
        </div>
        }


        { 
        popUpB &&
        <div id='popUpB'>
            <h2>monthly assets report</h2>
            <div id="Data">
            <div className="Fields">
                <div className="inFields">
                    <p>Aids:</p>
                    <p>{aidcount}</p>   
                </div>
                <div className="inFields">
                    <p>Quantity Handed Out</p>
                       
                </div> 
            </div>
            <div className="Fields">
                <div className="inFields">
                    <p>Qunatity Added </p>
                        
                </div>
                <div className="inFields">
                    <p>Quantity Left</p>
                       
                </div>   
                  
            </div>
        </div>



        </div>
        }

    </div>

    )
  }
  
  export default Reports