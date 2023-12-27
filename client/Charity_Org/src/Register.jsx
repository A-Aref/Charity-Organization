
import './Register.css'
import { useNavigate } from 'react-router-dom';



import { useEffect, useState } from 'react'


function Register(props)
{
  
  const navigate = useNavigate();
  const [errorText,setErrorText] = useState('')
  const [fname,setfname] = useState('')
  const [lname,setlname] = useState('')
  const [phone,setphone] = useState('')
  const [address,setaddress] = useState('')
  const [pass,setpass] = useState('')
  const [cpass,csetpass] = useState('')
  const [email,setemail] = useState('')
  const [populated,setPopulated] = useState(false)


  function reset() {   
    setaddress('')
    setpass('')
    csetpass('')
    setemail('')
    setfname('')
    setlname('')
    setphone('')
    setPopulated(false)
  }

  function Registerbutt () {
    setPopulated(true)
    if(fname.trim().length === 0) {
      setPopulated(false)    
    }
    if( lname.trim().length === 0) {
      setPopulated(false)
    }
    if(email.trim().length === 0) {
      setPopulated(false)
    }
    if(phone.trim().length === 0) {
      setPopulated(false)
    }
    if(address.trim().length === 0) {
      setPopulated(false)    
    }
    if(pass.trim().length === 0) {
      setPopulated(false) 
    }
    if(cpass.trim().length === 0) {
      setPopulated(false)
    }
  }

    useEffect(() => {
      if (populated) {
       
        let temp = {"Fname":fname,"Lname":lname,"Email":email,"Password":pass,"Phone":phone,"Address":address};
        fetch("/api/RegisterCheck", {
          method: "POST",
          body:  JSON.stringify({Email:email}),
          headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
        })
        .then((response)=> response.json())
        .then((data) => {
          if(data === "Inserted successfully")
          {
            fetch("/api/Register", {
              method: "POST",
              body:  JSON.stringify(temp),
              headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=> response.json())
            .then(() => {
              navigate('/')
              reset();
            })
          }
          else
          {
            setErrorText(data)
            reset();
          }
        })
        
      }
    }, [populated]);
    
      



  return (
    <div id='RegisterPage'>
      <p>{errorText}</p>
      <fieldset id='register'>
        <h1>Register</h1>    
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
          <input type="password" id="Pass" value={pass} onChange={(e) => setpass(e.target.value)} placeholder='Password'/>
        </div>   
        <div>
          <input type="password" id="CPass" value={cpass} onChange={(e) => csetpass(e.target.value)} placeholder='Confirm Password'/>
        </div>   
        <br />
        <div>
        <button id="reg" onClick={Registerbutt}>Register</button>
        </div>
    </fieldset>
  </div>
  )
}

export default Register









