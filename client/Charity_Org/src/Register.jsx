
import './Register.css'


function Register() {
    return (
      <div id='RegisterPage'>
        <fieldset id='register'>
          <h1>Register</h1>
          <input type="text" name="Name" placeholder='Name'/>
          <br />
          <input type="text" name="NID" placeholder='National ID'/>
          <br />
          <input type="text" name="Password" placeholder='Password'/>
          <br />
          <input type="text" name="CPassword" placeholder='Confirm Password'/>
          <br />
          <label htmlFor="DOB">Date of Birth</label>
          <input type="date" name="DOB" id='DOB' />
          <br />
          <label htmlFor="Branch">Branch</label>
          <select name="Branch" id="" value="">
            <option value="" disabled >Select nearest branch </option>
            <option value="1">maadi</option>
            <option value="2">tagamo3</option>
            <option value="3">october</option>
            <option value="4">abo qir</option>
          </select>
          <br />
          <input type="text" name="Address" placeholder='Detailed address'/>
          <br />
          <button type="submit" id="Signin" >Register</button>
          <br />
        </fieldset>
      </div>
    )
  }
  
  export default Register