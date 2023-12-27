
import { useEffect, useState } from 'react'
import "./Account.css"

function Account(props)
{

    const [user,setUser] = useState(props.user)
    const [tempUser,setTempUser] = useState(props.user)

    function Save () {
        setUser({...tempUser})
    }
    //udpate database
    useEffect(() =>   {fetch("/api/volunteer/updateAccount", {
        method: "POST",
        body:  JSON.stringify(user),
        headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
    })
    .then((response)=>{return response.json()})
    },[user])

  return (
    <div id='accountPage'>

        <h1 id="Title">Edit Profile</h1>
        <button id="logout" onClick={() =>props.view('none')}>Logout</button>

        <div id="Data">
            <div className="Fields">
                <div className="inFields">
                    <p>First Name</p>
                    <input type="text" className="Account" value={tempUser.FName} onChange={(e) =>setTempUser({...tempUser, FName: e.target.value })}/>   
                </div>
                <div className="inFields">
                    <p>Last Name</p>
                    <input type="text" className="Account" value={tempUser.LName} onChange={(e) =>setTempUser({...tempUser, LName: e.target.value })}/>   
                </div> 
            </div>
            <div className="Fields">
                <div className="inFields">
                    <p>Email</p>
                    <input type="text" className="Account" value={tempUser.Email} onChange={(e) =>setTempUser({...tempUser, Email: e.target.value })}/>    
                </div>
                <div className="inFields">
                    <p>Phone</p>
                    <input type="text" className="Account" value={tempUser.Phone} onChange={(e) =>setTempUser({...tempUser, Phone: e.target.value })}/>   
                </div>   
                  
            </div>
            <div className="Fields">
                <div className="inFields">
                    <p>Points</p>
                    <h2>{user.Points}</h2>   
                </div>
                <div className="inFields">
                    <p>Team_ID</p>
                    <h2>{user.TeamID}</h2>  
                </div>    
            </div>
            <div className="Fields">
                <div className="inFields">
                    <p>Password</p>
                    <input type="text" className="Account" value={tempUser.Pass} onChange={(e) =>setTempUser({...tempUser, Pass: e.target.value })}/>   
                </div>   
                  
            </div>
        </div>
        <br />
        <div>
        <button id ="cancel" onClick={() => setTempUser({...user})}>Cancel</button>
        <button id="Save" onClick={() => Save()}>Save</button>
        </div>
       
    </div>
  )
}

export default Account