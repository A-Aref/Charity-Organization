
import { useEffect, useState } from 'react'
import "./Team.css"

function Team(props) {
    
    const [points,setPoints] = useState(Array(10).fill(0))
    useEffect(() => setPoints(Array(props.volunteers.length).fill(0)),[props.volunteers])
    
    
    const [popUpV,setPopUpV] = useState(false)
    const [fName,setFName] = useState('')
    const [lName,setLName] = useState('')
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')
    const [gender,setGender] = useState('')
    const [address,setAddress] = useState('')
    const [doB,setDoB] = useState('')
    const [jDate,setJDate] = useState('')
    const [populated,setPopulated] = useState(false)

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
        
        if(fName.trim().length === 0) {
            setPopulated(false)
        }
        if(lName.trim().length === 0) {
            setPopulated(false)
        }
        if(phone.trim().length === 0) {
            setPopulated(false)
        }
        if(email.trim().length === 0) {
            setPopulated(false)
        }
        if(address.trim().length === 0) {
            setPopulated(false)
        }
        if(doB.trim().length === 0) {
            setPopulated(false)
        }
        if(jDate.trim().length === 0) {
            setPopulated(false)
        }
        if(gender.trim().length === 0) {
            setPopulated(false)
        }
    }

    useEffect(() => {
        if(populated) {
            let temp = props.volunteers
            let genderbit = 1
            if(gender === 'female')
            {
                genderbit = 0
            }
            let addedV = {"FName": fName, "LName":lName,"VRole":"Volunteer","Email":email,"Phone":phone,"Pass":phone,"Join_Date":jDate,"DoB":doB,"Gender":genderbit,"Promoted":0,"Event_Request":null,"Points":0,"TeamID":props.user.TeamID}
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
            .then((data)=>{
                fetch("/api/leader/selectTeam", {
                    method: "POST",
                    body:  JSON.stringify(props.user),
                    headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
                })
                .then((response)=>{return response.json()})
                .then((data)=>{
                  console.log(JSON.parse(data))
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
        setJDate('')
        setLName('')
        setPhone('')
        setGender('')
        setPopulated(false)
    }


    function AddPoints () {
        if(confirm("Are you sure you want to make this change"))
        {
            let temp = points
            props.setVolunteers(props.volunteers.map((member) => {
                const sumPoints = parseInt(member.points)+parseInt(points[member.key])
                temp[member.key] = 0
                return {
                    ...member,
                    points: sumPoints
                }
            }))
            setPoints({...temp})
            //update database
        }

    }

    function changeBest (Rkey) {
        if(confirm("Are you sure you want to make this change"))
        {
            props.setVolunteers(props.volunteers.map((member) => {
                return {
                    ...member,
                    best: member.key == Rkey ? true:false
                }
            }))
            //update database
        } 
    }

    function Sort () {
        //order by from database
    }

    return (
    <div id='teamPage'>
        <h1 id='Title'>Team Members</h1>
        <div id='sort'>
            <button type="button" disabled={popUpV} onClick={Sort}>Sort on Points</button>
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
                            <input type="number" className='PointsAdd' min='0' max="500" value={points[key]} onChange={(e)=>{changePoints(e.target.value,key)}}/>
                        </div>
                        <div className='teamText'>{member.Phone}</div>
                        <div className='teamText bestMember'>
                            <input type="radio" className='radioBest' checked={member.best} onChange={() => changeBest(key)}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div id='addPoints'>
            <button type="button" onClick={() => setPopUpV(true)} disabled={popUpV}>Add Volunteer</button>
            <button type="button" onClick={AddPoints} disabled={popUpV}>Add points</button>
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
                <div>
                    <label htmlFor='Join_Date'>Join Date</label>
                    <input type="date" id="Join_Date" value={jDate} onChange={(e) => setJDate(e.target.value)}/>
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