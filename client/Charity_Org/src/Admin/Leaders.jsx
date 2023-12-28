
import { useEffect, useState } from 'react'
import moment from 'moment'
import "./Leaders.css"

function leaders(props) {
    
    const [prom,setprom] = useState([])
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
            alert("Please enter a first name.");
        }else
        if(lname.trim().length === 0) {
            setPopulatedB(false)
            alert("Please enter a last name.");
        }else
        if(phone.trim().length === 0) {
            setPopulatedB(false)
            alert("Please enter a phone number.");
        }else
        if(email.trim().length === 0) {
            setPopulatedB(false)
            alert("Please enter an email.");
        }else
        if(address.trim().length === 0) {
            setPopulatedB(false)
            alert("Please enter an address.");
        }else
        if(dob=='') {
            setPopulatedB(false)
            alert("Please choose a date.");
        }else
        if (!/^[a-zA-Z]+$/.test(fname.trim())) {
            setPopulatedB(false);
            alert("Please enter a valid first name.");
        }else
        if (!/^[a-zA-Z]+$/.test(lname.trim())) {
            setPopulatedB(false);
            alert("Please enter a valid last name.");
        }else
        if (!/^[0-9]+$/.test(phone.trim())) {
            setPopulatedB(false);
            alert("Please enter a valid phone number.");
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

    function resetc() {

        setPopUpC(false)
        setPopulatedC(false)
        
    }

    const [popUpB,setPopUpB] = useState(false)
    const [populatedB,setPopulatedB] = useState(false)

    const [popUpC,setPopUpC] = useState(false)
    const [populatedC,setPopulatedC] = useState(false)

   


    useEffect(() => {
        if(populatedB) {
            let g=1
            if (gender === "0")
            {
                g = 0
            }

            let addedB = {"FName": fname,"LName":lname,"VRole":"Head", "Email":email,"Phone":phone,"Pass": phone, "Join_Date": date,"DoB": dob,"Gender":g,"Promoted":0,"Event_Request":null,"Points":0,"TeamID":null, "best_member":null}
            setPopUpB(false)

            fetch("/api/Admin/addleader", {
                method: "POST",
                body:  JSON.stringify(addedB),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})
            .then(()=>{
                fetch("/api/Admin/selectleaders")
                .then((response)=>{return response.json()})
                .then((data)=>{
                  props.setleader(JSON.parse(data))
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

    useEffect(() => {
        if(popUpC) {

                fetch("/api/Admin/selectprom")
                .then((response)=>{return response.json()})
                .then((data)=>{
                  setprom(JSON.parse(data))
                })
            setPopulatedC(false)
        }
    },[popUpC])


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
                    {props.leader.map((member,key) => (
                        <div className='member' key={key}>
                            <div className='benfText idtable'>{member.V_ID}</div>
                            <div className='benfText'>{`${member.FName}  ${member.LName}`}</div>
                            <div className='benfText'>{member.Email}</div>
                            <div className='benfText'>{member.Phone}</div>
                            <div className='benfText'>{(member.DoB).slice(0,10)}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div id='addbenef'>
                <button type="button" onClick={() => setPopUpB(true)} >Add Leader</button>
                <button type="button" onClick={() => setPopUpC(true)} >View Promotions</button>
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


        { 
        popUpC &&
        <div id='popUpP'>
            <h2>Promoted Leaders</h2>
            <div id='PromotionData'>
                <div id='tableHeadP'>
                    <div className='promotedText'>ID</div>
                    <div className='promotedText'>Name</div>
                    <div className='promotedText'>Team ID</div>
                </div>
                <div id='Promotions'>
                    {prom.map((member,key) => (
                        <div className='promoted' key={key}>
                            <div className='promotedText'>{member.V_ID}</div>
                            <div className='promotedText'>{`${member.FName}  ${member.LName}`}</div>
                            <div className='promotedText'>{member.TeamID}</div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div>
                <button type="button" onClick={() => resetc()}>Cancel</button>
            </div>
        
            
        </div>
        }
    
            
        </div>
        )

    /*-----------------------------------------------------------------------------------------------------------------------*/
    
  }
  
  export default leaders