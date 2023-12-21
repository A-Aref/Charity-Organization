
import './Signin.css'
import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'

function Signin(props) {
  
  const navigate = useNavigate()
  const [password , setpassword] = useState("")
  const [showPassword , setShowPassword] = useState(true)
  const [id,setId] = useState("")
  const [errorText,setErrorText] = useState("")

  useEffect(() => props.view('none'),[])

  function Submit()
  {
    if( id === "" || password === "")
    {
      if(id === "")
      {
        console.log("Enter the ID")
      }
      if(password === "")
      {
        console.log("Enter the password")
      }
    }
    else
    {
      var Search = {"V_ID": id,"Pass":password}
    fetch("/api/signin", {
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
        setErrorText("")
        var user = JSON.parse(data)
        props.setUser(user)
        if(user.VRole === 'Head') 
        {
          props.view('leader')
          navigate('/Leader')
        }
        if(user.VRole === 'volunteer') 
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
