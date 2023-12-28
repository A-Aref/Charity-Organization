
import { useEffect, useState } from 'react'
import moment from 'moment'
import "./Team.css"

function Team(props) {
    
    const [points,setPoints] = useState([])
    const [bestSelect,setbestSelect] = useState('')
    useEffect(() => {
        setPoints(Array(props.volunteers.length).fill(0))
        props.volunteers.forEach(element => {
            if(element.best_member !== null)
            {
                if(element.best_member.data[0] === 1)
                {
                    setbestSelect(element.V_ID)
                }
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

    const [request,setRequest] = useState('')

    function changePoints (value,Rkey) {
        if(value <= 500 && value >= 0)
        {
            let temp = points
            temp[Rkey] = value
            setPoints({...temp})
        }
    }

    function addVolunteer() {

        setPopulated(true)
        
        if(fName.trim().length === 0 || !/^[a-zA-Z]+$/.test(fName.trim())) {
            setPopulated(false);
            alert("Please enter a first name.");
          }
        if(lName.trim().length === 0 || !/^[a-zA-Z]+$/.test(lName.trim())) {
            setPopulated(false)
            alert("Please enter a last name.");
        }
        if (!/^[0-9]+$/.test(phone.trim())) {
            setPopulated(false);
            alert("Please enter a valid phone num.");
          }
        if(email.trim().length === 0) {
            setPopulated(false)
            alert("Please enter a valid email.");
        }
        if(address.trim().length === 0) {
            setPopulated(false)
            alert("Please enter a address.");
        }
        if(doB.trim().length === 0) {
            setPopulated(false)
            alert("Please enter a date of birth.");
        }
        if(gender.trim().length === 0) {
            setPopulated(false)
            alert("Please select gender.");
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
        setAddress('')
        setDoB('')
        setEmail('')
        setFName('')
        setLName('')
        setPhone('')
        setGender('')
        setPopulated(false)
    }


    function AddPoints () {
        if(confirm("Are you sure you want to make this change"))
        {
            let temp = points
            //update database
        Promise.all(props.volunteers.map((member,key) => {
            const sumPoints = parseInt(member.Points)+parseInt(points[key])
            temp[key] = 0
            fetch("/api/leader/updatePoints", {
                method: "POST",
                body:  JSON.stringify({V_ID:member.V_ID,Points:sumPoints}),
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
                }).then(() => setPoints(Array(props.volunteers.length).fill(0)))
            })   
        }
    }

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

    function updatePromoted () {
        if(confirm("Are you sure you want to make this change"))
        {
            fetch("/api/leader/updatePromoted", {
                method: "POST",
                body:  JSON.stringify({V_ID:request}),
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
    }

    return (
    <div id='teamPage'>
        <h1 id='Title'>Team Members</h1>
        <div id='sort'>
            <button type="button" disabled={popUpV} onClick={Sort}>Sort by Points</button>
        </div>

        <div id='teamData'>
            <div id='tableHead'>
                <div className='teamText'>ID</div>
                <div className='teamText'>Name</div>
                <div className='teamText'>Points</div>
                <div className='teamText'>Phone</div>
                <div className='teamText bestMember'>Best member</div>
            </div>
            <div id='members'>
                {props.volunteers.map((member,key) => (
                    <div className='member' key={key}>
                        <div className='teamText'>{member.V_ID}</div>
                        <div className='teamText'>{member.FName} {member.LName}</div>
                        <div className='Points'>
                            <div className='point'>{member.Points}</div>
                            <input type="number" className='PointsAdd' value={points[key] || '0'} onChange={(e)=>{changePoints(e.target.value,key)}}/>
                        </div>
                        <div className='teamText'>{member.Phone}</div>
                        <div className='teamText bestMember'>
                            <input type="radio" className='radioBest' checked={member.V_ID == bestSelect} onChange={() => changeBest(member.V_ID)}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div id='addPoints'>
            <button type="button" onClick={() => setPopUpV(true)} disabled={popUpV}>Add Volunteer</button>
            <button type="button" onClick={AddPoints} disabled={popUpV}>Add points</button>
        </div>
        <div>
            <select name='select_volunteer' value={request} onChange={(e) => setRequest(e.target.value)}>
                <option value="" disabled >Request Promotion for volunteer</option>
                {props.volunteers.map((volunteer,key) => (
                volunteer.Promoted.data != undefined && volunteer.Promoted.data[0] === 0 && <option value={volunteer.V_ID} key={key}>{volunteer.FName} {volunteer.LName}</option>
                ))}
            </select> 
            <button type="button" onClick={updatePromoted} disabled={popUpV || request === ""}>Request Promotion</button>
        </div>
        {popUpV &&
        <div id='popUpV'>
            <h2>Add Volunteer</h2>
            <div>
                <div>
                    <label htmlFor='First_Name'>First Name</label>
                    <input type="text" id="First_Name" value={fName} onChange={(e) => setFName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='Last_Name'>Last Name</label>
                    <input type="text" id="Last_Name" value={lName} onChange={(e) => setLName(e.target.value)}/>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor='Phone'>Phone</label>
                    <input type="text" id="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='Email'>Email</label>
                    <input type="text" id="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>
            <div>
                <div id='Gender'>
                    <p id='gender'>Gender</p>
                    <div>
                        <label htmlFor="male">Male</label>
                        <input type="radio" name="Gender" id="male" value='male' checked={gender === 'male'} onChange={(e) => setGender(e.target.value)}/>
                        <label htmlFor="female">Female</label>
                        <input type="radio" name="Gender" id="female" value='female' checked={gender === 'female'} onChange={(e) => setGender(e.target.value)}/>
                    </div>  
                </div>
                <div>
                    <label htmlFor='Address'>Address</label>
                    <input type="text" id="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                </div>  
            </div>
            <div>
                <div>
                    <label htmlFor='DoB'>Date of Birth</label>
                    <input type="date" id="DoB" value={doB} onChange={(e) => setDoB(e.target.value)}/>
                </div>
            </div>
            <div>
                <button type="button" onClick={() => reset()}>Cancel</button>
                <button type="button" onClick={addVolunteer}>Save</button>
            </div>
        </div>
        }
        
    </div>

    )
  }
  
  export default Team