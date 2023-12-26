
import { useEffect, useState } from 'react'
import moment from 'moment'
import "./Team.css"

function Team(props) {
    
    const [teams,setteams] = useState([])
    const [loc,setloc] = useState('')
    const [dep,setdep] = useState('')
    const [pts,setpts] = useState(0)
    const [leader,setleader] = useState('')
    const [best,setbest] = useState('')

    useEffect(() =>   {
        fetch("/api/Admin/selectallteams")
        .then((response)=>{return response.json()})
        .then((data)=>{setteams(JSON.parse(data))
        console.log(JSON.parse(data))})
    },[])

    const [points,setPoints] = useState([Array(10).fill(0)])
    const [bestSelect,setbestSelect] = useState('')
    useEffect(() => {
        setPoints(Array(props.volunteers.length).fill(0))
        props.volunteers.forEach(element => {
            if(element.best_member.data[0] === 1)
            {
                setbestSelect(element.V_ID)
            }    
        })
    },[props.volunteers])
    
    
    const [popUpV,setPopUpV] = useState(false)
    const [fName,setFName] = useState('')
    const [lName,setLName] = useState('')
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')
    const [gender,setGender] = useState('')
    const [address,setAddress] = useState('')
    const [doB,setDoB] = useState('')
    const [populated,setPopulated] = useState(false)

    function changePoints (value,Rkey) {
        if(value <= 500 && value >= 0)
        {
            let temp = points
            temp[Rkey] = value
            setPoints({...temp})
        }
    }

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
            let temp = props.volunteers
            let genderbit = 1
            const date = moment().format('YYYY-MM-DD')
            if(gender === 'female')
            {
                genderbit = 0
            }
            let addedV = {"FName": fName, "LName":lName,"VRole":"Volunteer","Email":email,"Phone":phone,"Pass":phone,"Join_Date":date,"DoB":doB,"Gender":genderbit,"Promoted":0,"Event_Request":null,"Points":0,"TeamID":props.user.TeamID}
            temp[props.volunteers.length] = addedV
            
            reset()
            setPoints(Array(props.volunteers.length).fill(0))

            //update database
            fetch("/api/leader/addVolunteer", {
                method: "POST",
                body:  JSON.stringify(addedV),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})
            .then(()=>{
                fetch("/api/leader/selectTeam", {
                    method: "POST",
                    body:  JSON.stringify(props.user),
                    headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
                })
                .then((response)=>{return response.json()})
                .then((data)=>{
                  props.setVolunteers(JSON.parse(data))
                })
            })  
            
        }
    },[populated])

    function reset() {
        setPopUpV(false)
        setdep('')
        setloc('')
        setpts('')
        setleader('')
        setbest('')
        setPopulated(false)
    }


    // function AddPoints () {
    //     if(confirm("Are you sure you want to make this change"))
    //     {
    //         let temp = points
    //         //update database
    //     Promise.all(props.volunteers.map((member,key) => {
    //         const sumPoints = parseInt(member.Points)+parseInt(points[key])
    //         temp[key] = 0
    //         fetch("/api/leader/updatePoints", {
    //             method: "POST",
    //             body:  JSON.stringify({V_ID:member.V_ID,Points:sumPoints}),
    //             headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
    //         })
    //         .then((response)=>{return response.json()})
    //         })).then(()=>{
    //             fetch("/api/leader/selectTeam", {
    //                 method: "POST",
    //                 body:  JSON.stringify(props.user),
    //                 headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
    //             })
    //             .then((response)=>{return response.json()})
    //             .then((data)=>{
    //               props.setVolunteers(JSON.parse(data))
    //             }).then(() => setPoints(Array(props.volunteers.length).fill(0)))
    //         })
            
            
    //     }

    // }

    function changeBest (Rkey) {
        if(confirm("Are you sure you want to make this change"))
        {
           Promise.all(props.volunteers.map((member) => {
            let selected = false
            if (member.V_ID === Rkey)
            {
                selected =true
                setbestSelect(member.V_ID)
            }
            
            fetch("/api/leader/updateBest", {
                method: "POST",
                body:  JSON.stringify({V_ID:member.V_ID,best:selected}),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})
            })).then(()=>{
                fetch("/api/leader/selectTeam", {
                    method: "POST",
                    body:  JSON.stringify(props.user),
                    headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
                })
                .then((response)=>{return response.json()})
                .then((data)=>{
                  props.setVolunteers(JSON.parse(data))
                })
            })
        } 
    }

    function Sort () {
        fetch("/api/leader/selectTeamOrdered", {
            method: "POST",
            body:  JSON.stringify(props.user),
            headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
        })
        .then((response)=>{return response.json()})
        .then((data)=>{
          props.setVolunteers(JSON.parse(data))
        })
    }

    return (
    <div id='teamPage'>
        <h1 id='Title'>Teams</h1>
        {/* <div id='sort'>
            <button type="button" disabled={popUpV} onClick={Sort}>Sort by Points</button>
        </div> */}

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
                            {/* <input type="number" className='PointsAdd' min='0' max="500" value={pts[key]} onChange={(e)=>{changePoints(e.target.value,key)}}/> */}
                        </div>
                        <div className='teamText'>{member.Leader}</div>
                        <div className='teamText bestMember'>
                            <input type="radio" className='radioBest' checked={member.T_ID == best} onChange={() => changeBest(member.T_ID)}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div id='addPoints'>
            {/* <button type="button" onClick={() => setPopUpV(true)} disabled={popUpV}>Add Volunteer</button>
            <button type="button" onClick={AddPoints} disabled={popUpV}>Add points</button> */}
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
                    <input type="text" id="Email" value={leader} onChange={(e) => setleader(e.target.value)}/>
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