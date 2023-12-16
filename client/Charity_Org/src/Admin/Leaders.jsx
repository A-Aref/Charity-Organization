
import { useEffect, useState } from 'react'
import moment from 'moment'
import "./Leaders.css"

function leaders() {
    const [leaders,setleaders] = useState([])
    const [phone,setphone] = useState('')
    const [email,setemail] = useState('')
    const [gender,setgender] = useState('')
    const [address,setaddress] = useState('')
    const [dob,setdob] = useState('')
    const [fname,setfname] = useState('')
    const [lname,setlname] = useState('')

    const date = moment().format('YYYY-MM-DD')

    function addleader() {

        setPopulatedB(true)
        
        if(fname.trim().length === 0) {
            setPopulatedB(false)
        }
        if(lname.trim().length === 0) {
            setPopulatedB(false)
        }
        if(phone.trim().length === 0) {
            setPopulatedB(false)
        }
        if(email.trim().length === 0) {
            setPopulatedB(false)
        }
        if(gender.trim().length === 0) {
            setPopulatedB(false)
        }
        if(address.trim().length === 0) {
            setPopulatedB(false)
        }
        if(dob.trim().length === 0) {
            setPopulatedB(false)
        }
    }

    function reset() {
        setphone('')
        setemail('')
        setaddress('')
        setlname('')
        setfname('')
        setgender('')
        setdob('')

        setPopUpB(false)
        setPopulatedB(false)
        
    }

    const [popUpB,setPopUpB] = useState(false)
    const [populatedB,setPopulatedB] = useState(false)

    useEffect(() =>   {
        fetch("/api/Admin/selectleaders")
        .then((response)=>{return response.json()})
        .then((data)=>{setleaders(JSON.parse(data))
        console.log(JSON.parse(data))})
    },[])


    useEffect(() => {
        if(populatedB) {
            let addedB = {"FName": fname,"LName":lname,"VRole":"Head", "Email":email,"Phone":phone,"Pass": phone, "Join_Date": date,"DoB": dob,"Gender":gender,"Promoted":0,"Event_Request":null,"Points":0,"TeamID":null, "best_member":null}
            setPopUpB(false)

            fetch("/api/Admin/addleader", {
                method: "POST",
                body:  JSON.stringify(addedB),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})
            .then((data)=>{
                fetch("/api/Admin/selectleaders")
                .then((response)=>{return response.json()})
                .then((data)=>{
                  setleaders(JSON.parse(data))
                })
            })  

            setphone('')
            setemail('')
            setaddress('')
            setlname('')
            setfname('')
            setgender('')
            setdob('')
            setPopulatedB(false)
        }
    },[populatedB])


    return (
        <div id='beneficiariesPage'>
            <div>
                <h1 id='Title'>Leaders</h1>
            </div>
            <div id='teamData'>
                <div id='tableHead'>
                    <div className='benfText idtable'>ID</div>
                    <div className='benfText'>Name</div>
                    <div className='benfText'>email</div>
                    <div className='benfText'>phone</div>
                    <div className='benfText'>Date of birth</div>
                </div>
                <div id='beneficiaries'>
                    {leaders.map((member,key) => (
                        <div className='member' key={key}>
                            <div className='benfText idtable'>{member.V_ID}</div>
                            <div className='benfText'>{`${member.FName}  ${member.LName}`}</div>
                            <div className='benfText'>{member.Email}</div>
                            <div className='benfText'>{member.Phone}</div>
                            <div className='benfText'>{member.DoB}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div id='addbenef'>
                <button type="button" onClick={() => setPopUpB(true)} >Add Leader</button>
            </div>
    
            { 
            popUpB &&
            <div id='popUpB'>
            <h2>Add Leader</h2>
            <div>
                <div>
                    <label htmlFor='First_Name'>First Name</label>
                    <input type="text" id="First_Name" value={fname} onChange={(e) => setfname(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='Last_Name'>Last Name</label>
                    <input type="text" id="Last_Name" value={lname} onChange={(e) => setlname(e.target.value)}/>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor='Phone'>Phone</label>
                    <input type="text" id="Phone" value={phone} onChange={(e) => setphone(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='Email'>Email</label>
                    <input type="text" id="Email" value={email} onChange={(e) => setemail(e.target.value)}/>
                </div>
            </div>
            <div>
                <div id='Gender'>
                    <p id='gender'>Gender</p>
                    <div>
                        <label htmlFor="male">Male</label>
                        <input type="radio" name="Gender" id="male" value='male' checked={gender === 'male'} onChange={(e) => setgender(e.target.value)}/>
                        <label htmlFor="female">Female</label>
                        <input type="radio" name="Gender" id="female" value='female' checked={gender === 'female'} onChange={(e) => setgender(e.target.value)}/>
                    </div>  
                </div>
                <div>
                    <label htmlFor='Address'>Address</label>
                    <input type="text" id="Address" value={address} onChange={(e) => setaddress(e.target.value)}/>
                </div>  
            </div>
            <div>
                <div>
                    <label htmlFor='DoB'>Date of Birth</label>
                    <input type="date" id="DoB" value={dob} onChange={(e) => setdob(e.target.value)}/>
                </div>
            </div>
        
            <div>
                <button type="button" onClick={() => reset()}>Cancel</button>
                <button type="button" onClick={addleader}>Save</button>
            </div>
            </div>
            }
    
            
        </div>
        )

    /*-----------------------------------------------------------------------------------------------------------------------*/
    
  }
  
  export default leaders