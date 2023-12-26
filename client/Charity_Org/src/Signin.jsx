
import './Signin.css'
import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'

function Signin(props) {
  
  const navigate = useNavigate()
  const [password , setpassword] = useState("")
  const [showPassword , setShowPassword] = useState(true)
  const [id,setId] = useState("")
  const [errorText,setErrorText] = useState("  ")

  useEffect(() => props.view('none'),[])

  function Submit()
  {
    if( id === "" || password === "")
    {
      if(id === "")
      {
        setErrorText("Enter the ID")
      }
      if(password === "")
      {
        setErrorText("Enter the password")
      }
    }
    else
    {

      let sID = id.slice(2)
      let Search = {"ID": sID,"Pass":password}
      if (id[0] == 'V' && id[1] == '_')
      {
        fetch("/api/signinV", {
          method: "POST",
          body:  JSON.stringify(Search),
          headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
        })
        .then((response)=>{return response.json()})
        .then((data)=>{
        if(data === "Not found")
        {
          setErrorText(data)
        }
        else
        {
          setErrorText("  ")
          var user = JSON.parse(data)
          props.setUser(user)
          if(user.VRole === 'Head') 
          {
            props.view('leader')
            navigate('/Leader')
          }
          if(user.VRole === 'volunteer' || user.VRole === 'Volunteer') 
          {
            props.view('volunteer')
            navigate('/volunteer')
          }
          if(user.VRole === 'Admin') 
          {
            props.view('Admin')
            navigate('/Admin')
          }
        }
        })
      }
      else if (id[0] == 'D' && id[1] == '_')
      {
        fetch("/api/signinD", {
          method: "POST",
          body:  JSON.stringify(Search),
          headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
        })
        .then((response)=>{return response.json()})
        .then((data)=>{
        if(data === "Not found")
        {
          setErrorText(data)
        }
        else
        {
          setErrorText(" ")
          var user = JSON.parse(data)
          props.setUser(user)
          props.view('Donor')
          navigate('/Donor')
        }
        })
      }
      else
      {
        setErrorText("Invalid username")
      }
    }   
  }
  

  return (
    <div id='SigninPage'>
    <p>{errorText}</p>     
      <fieldset id='login'>
        <h1>Sign in</h1>
        <input type="text" name="ID" placeholder='ID' value={id} onChange={(e)=>{setId(e.target.value)}}/>
        <br />
        <div id='password'>
        <input type={showPassword ? "password" : 'text'} name="Pass" id='pass' placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
        <input type="checkbox" name="check" id="check" value={showPassword} onChange={() => setShowPassword((prev) => !prev)}/>
        </div>
        <br />
        <button type="submit" id="Signin" onClick={Submit}>Sign in</button>
        <br />
        <br />
        <Link to="/Register">Create donor account</Link>
        
      </fieldset>
    </div>
  )
}

export default Signin
