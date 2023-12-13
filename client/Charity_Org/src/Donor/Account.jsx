
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
                        
                        <input type="text" id="fname" value={fname} onChange={(e) => setfname(e.target.value)}  placeholder="First Name"/>
                    </div>

                    <div>
                     
                        <input type="text" id="Lname" value={lname} onChange={(e) => setlname(e.target.value)} placeholder='Last Name'/>
                    </div>   
                
                
                    <div>
                        
                        <input type="text" id="Phone" value={phone} onChange={(e) => setphone(e.target.value)} placeholder='Phone'/>
                    </div>

                    <div>
                        
                        <input type="text" id="Email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email'/>
                    </div>   
                
               
                    <div>
                        
                        <input type="text" id="Address" value={address} onChange={(e) => setaddress(e.target.value)} placeholder='Address'/>
                    </div>

                    <div>

                        <input type="text" id="Pass" value={pass} onChange={(e) => setpass(e.target.value)} placeholder='Password'/>
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