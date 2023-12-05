
import { useEffect, useState } from 'react'
import "./Account.css"

function Account(props)
{

    const [user,setUser] = useState({"fName":"Aref","lName":"Mahmmoud","phone":"01236","email":"dodogames000","points":8787,"team":"c_125"})
    const [tempUser,setTempUser] = useState({...user})

    function Save () {
        setUser({...tempUser})
        //udpate database
    }

  return (
    <div id='accountPage'>

        <h1 id="Title">Edit Profile</h1>
        <button id="logout" onClick={() =>props.view('none')}>Logout</button>

        <div id="Data">
            <div className="Fields">
                <div className="inFields">
                    <p>First Name</p>
                    <input type="text" className="Account" value={tempUser.fName} onChange={(e) =>setTempUser({...tempUser, fName: e.target.value })}/>   
                </div>
                <div className="inFields">
                    <p>Last Name</p>
                    <input type="text" className="Account" value={tempUser.lName} onChange={(e) =>setTempUser({...tempUser, lName: e.target.value })}/>   
                </div> 
            </div>
            <div className="Fields">
                <div className="inFields">
                    <p>Email</p>
                    <input type="text" className="Account" value={tempUser.email} onChange={(e) =>setTempUser({...tempUser, email: e.target.value })}/>    
                </div>
                <div className="inFields">
                    <p>Phone</p>
                    <input type="text" className="Account" value={tempUser.phone} onChange={(e) =>setTempUser({...tempUser, phone: e.target.value })}/>   
                </div>   
            </div>
            <div className="Fields">
                <div className="inFields">
                    <p>Points</p>
                    <h2>{user.points}</h2>   
                </div>
                <div className="inFields">
                    <p>Team_ID</p>
                    <h2>{user.team}</h2>  
                </div>    
            </div>
        </div>
        <br />
        <div>
        <button id ="cancel" onClick={() => setTempUser({...user})}>Cancel</button>
        <button id="Save" onClick={Save}>Save</button>
        </div>
       
    </div>
  )
}

export default Account