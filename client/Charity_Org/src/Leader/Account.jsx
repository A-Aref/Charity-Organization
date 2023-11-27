
import "./Account.css"

function Account()
{
  return (
    <div id='accountPage'>

        <h1 id="Title">Edit Profile</h1>

        <div id="Data">
            <div className="Fields">
                <div className="inFields">
                    <p>First Name</p>
                    <input type="text"  placeholder="Abd-Allah" className="Account"/>   
                </div>
                <div className="inFields">
                    <p>Last Name</p>
                    <input type="text"  placeholder="Aref" className="Account"/>   
                </div> 
            </div>
            <div className="Fields">
                <div className="inFields">
                    <p>Email</p>
                    <input type="text"  placeholder="dodogames000@gmail.com" className="Account"/>    
                </div>
                <div className="inFields">
                    <p>Phone</p>
                    <input type="text"  placeholder="01026908100" className="Account"/>   
                </div>   
            </div>
            <div className="Fields">
                <div className="inFields">
                    <p>Points</p>
                    <h2>2999</h2>   
                </div>
                <div className="inFields">
                    <p>Team_ID</p>
                    <h2>C_512</h2>  
                </div>    
            </div>
        </div>
        <br />
        <div>
        <button id="Cancel">Cancel</button>
        <button id="Save">Save</button>
        </div>
       
    </div>
  )
}

export default Account