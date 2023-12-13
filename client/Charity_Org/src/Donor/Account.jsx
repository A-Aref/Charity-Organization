
import { useEffect, useState } from 'react'
import "./Account.css"

function Account(props)
{

    
    const [fname,setfname] = useState('')
    const [lname,setlname] = useState('')
    const [phone,setphone] = useState('')
    const [address,setaddress] = useState('')
    const [pass,setpass] = useState('')
    const [email,setemail] = useState('')
    const [populated,setPopulated] = useState('false')


    function reset() {
       
        setaddress('')
        setpass('')
        setemail('')
        setfname('')
        setlname('')
        setphone('')
    
        setPopulated(false)
    }
    function Save () {
        setUser({...tempUser})
        //udpate database
    }

  return (
    <div id='accountPage'>

        <h1 id="Title">Edit Profile</h1>
        <button id="logout" onClick={() =>props.view('none')}>Logout</button>

        <>
                
                    <div>
                        <label htmlFor='Fname'>First Name</label>
                        <input type="text" id="fname" value={fname} onChange={(e) => setfname(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor='Lname'>Last Name</label>
                        <input type="text" id="Lname" value={lname} onChange={(e) => setlname(e.target.value)}/>
                    </div>   
                
                
                    <div>
                        <label htmlFor='Phone'>Phone</label>
                        <input type="text" id="Phone" value={phone} onChange={(e) => setphone(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor='Email'>Email</label>
                        <input type="text" id="Email" value={email} onChange={(e) => setemail(e.target.value)}/>
                    </div>   
                
               
                    <div>
                        <label htmlFor='Address'>Address</label>
                        <input type="text" id="Address" value={address} onChange={(e) => setaddress(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor='Pass'>Password</label>
                        <input type="text" id="Pass" value={pass} onChange={(e) => setpass(e.target.value)}/>
                    </div>   
                
                
        </>
        <br />
        <div>
       
        <button type="button" onClick={() => reset()}>Cancel</button>
        <button id="Save" onClick={Save}>Save</button>
        </div>
       
    </div>
  )
}

export default Account