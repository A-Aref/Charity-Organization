
import './Signin.css'
import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'

function Signin(props) {
  
  const navigate = useNavigate()
  const [password , setpassword] = useState("")
  const [showPassword , setShowPassword] = useState(true)
  const [id,setId] = useState("")
  const [text,setText] = useState("")


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
      var Hi ={"ID": id,"password":password}
    fetch("/api/v2", {
        method: "POST",
        body:  JSON.stringify(Hi),
        headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
    })
    .then((response)=>{return response.json()})
    .then((data)=>{
      if(data === "Not found")
      {
        setText(data)
        props.view('leader')
        navigate("/Leader")
      }
      else
      {
        setText("")
      }

      console.log(data)})
    }
  }
  

  return (
    <div id='SigninPage'>
    <p>{text}</p>     
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
