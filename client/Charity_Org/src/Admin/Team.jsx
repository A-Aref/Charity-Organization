
import { useEffect, useState } from 'react'
import "./Team.css"

function Team(props) {
    
    const [teams,setteams] = useState([])
    const [loc,setloc] = useState('')
    const [dep,setdep] = useState('')
    const [leader,setleader] = useState('')

    useEffect(() =>   {
        fetch("/api/Admin/selectallteams")
        .then((response)=>{return response.json()})
        .then((data)=>{setteams(JSON.parse(data))})
    },[])

    const [bestSelect,setbestSelect] = useState('')

    useEffect(() => {
        teams.forEach(element => {
            if(element.Best_Team !== null)
            {
                if(element.Best_Team.data[0] === 1)
                {
                    setbestSelect(element.T_ID)
                }
            }    
        })
    },[teams])
    
    
    const [popUpV,setPopUpV] = useState(false)
    const [populated,setPopulated] = useState(false)


    function addteam() {

        setPopulated(true)
        
        if(loc.trim().length === 0) {
            setPopulated(false)
        }
        if(dep.trim().length === 0) {
            setPopulated(false)
        }
        if(leader.trim().length === 0) {
            setPopulated(false)
        }
        
    }

    useEffect(() => {
        if(populated) {
            
            let addt = {"Location": loc, "Department":dep,"TPoints":0,"Leader":leader,"Best_Team":0}
            

            //update database
            fetch("/api/leader/addteam", {
                method: "POST",
                body:  JSON.stringify(addt),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})
            .then(()=>{
                fetch("/api/Admin/selectallteams")
                .then((response)=>{return response.json()})
                .then((data)=>{
                    setteams(JSON.parse(data))
                    fetch("/api/Admin/updateleadersTeam",{
                        method: "POST",
                        body:  JSON.stringify({"T_ID":JSON.parse(data).slice(-1)[0].T_ID,"V_ID":leader}),
                        headers: { 'Accept': 'application/json','Content-Type': 'application/json'}
                    })
                    .then((response)=>{return response.json()})
                    .then(()=>{
                        fetch("/api/Admin/selectleaders")
                        .then((response)=>{return response.json()})
                        .then((data)=>{
                        props.setleader(JSON.parse(data))
                        })
                    })
                  reset()
                })
            })  
            
            
        }
    },[populated])

    function reset() {
        setPopUpV(false)
        setdep('')
        setloc('')
        setleader('')
        setPopulated(false)
    }



    function changeBest (Rkey) {
        if(confirm("Are you sure you want to make this change"))
        {
           Promise.all(teams.map((member) => {
            let selected = false
            if (member.T_ID === Rkey)
            {
                selected =true
                setbestSelect(member.T_ID)
            }
            
            fetch("/api/admin/updatebestteam", {
                method: "POST",
                body:  JSON.stringify({T_ID:member.T_ID,best:selected}),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})
            })).then(()=>{
                fetch("/api/Admin/selectallteams")
                .then((response)=>{return response.json()})
                .then((data)=>{
                  props.setleader(JSON.parse(data))
                })
            })
        } 
    }

    function Sort () {
        fetch("/api/admin/orderteams")
        .then((response)=>{return response.json()})
        .then((data)=>{
            setteams(JSON.parse(data))
        })
    }

    return (
    <div id='teamPage'>
        <h1 id='Title'>Teams</h1>
        <div id='sort'>
            <button type="button" disabled={popUpV} onClick={() => Sort()}>Sort by Points</button>
        </div>

        <div id='teamData'>
            <div id='tableHead'>
                <div className='teamText'>ID</div>
                <div className='teamText'>Location</div>
                <div className='teamText'>Department</div>
                <div className='teamText'>Points</div>
                <div className='teamText'>Leader</div>
                <div className='teamText bestMember'>Best Team</div>
            </div>
            <div id='members'>
                {teams.map((member,key) => (
                    <div className='member' key={key}>
                        <div className='teamText'>{member.T_ID}</div>
                        <div className='teamText'>{member.Location}</div>
                        <div className='teamText'>{member.Department}</div>
                        <div className='Points'>
                            <div className='point'>{member.TPoints}</div>
                        </div>
                        <div className='teamText'>{member.Leader}</div>
                        <div className='teamText bestMember'>
                            <input type="radio" className='radioBest' checked={member.T_ID == bestSelect} onChange={() => changeBest(member.T_ID)}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div id='addPoints'>
            <button type="button" onClick={() => setPopUpV(true)} disabled={popUpV}>Add Team</button>
        </div>
        {popUpV&&
        <div id='popUpV'>
            <h2>Add Team</h2>
            <div>
                <div>
                    <label htmlFor='First_Name'>Location</label>
                    <input type="text" id="First_Name" value={loc} onChange={(e) => setloc(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='Last_Name'>Department</label>
                    <input type="text" id="Last_Name" value={dep} onChange={(e) => setdep(e.target.value)}/>
                </div>
            </div>
            <div>
                
                <div>
                    <label htmlFor='Email'>Leader</label>
                    <select name='select_leader' value={leader} onChange={(e) => setleader(e.target.value)}>
                    <option value="" disabled > Select team leader</option>
                    {props.leader.map((leader,key) => (
                        leader.TeamID === null && <option value={leader.V_ID} key={key}>{leader.FName} {leader.LName}</option>
                    ))}
                    </select>
                </div>
            </div>

            <div>
                <button type="button" onClick={() => reset()}>Cancel</button>
                <button type="button" onClick={addteam}>Save</button>
            </div>
        </div>
        }
        
    </div>

    )
  }
  
  export default Team