import { useEffect, useState } from 'react'
import './Events.css'


function Events(props) {

    const [events, setEvents] = useState([])
    

    const [popUpT, setPopUpT] = useState(false)
   
    const [descrp, setdescrp] = useState("")
    const [email, setemail] = useState("")
    const [pass, setpass] = useState("")
    const [populatedE,setPopulatedE] = useState(false)
    



    function reset() {
        setPopUpT(false);
        setpass("")
        setemail("")
        setdescrp("")
        setPopulatedE("")
       
    }
    function createregistration () {
        setPopulatedE(true)
        if(pass.trim().length === 0) {
          setPopulatedE(false)
    }

    if(email.trim().length === 0) {
        setPopulatedE(false)
  }
  if(descrp.trim().length === 0) {
    setPopulatedE(false)
}
}








    return (
        <div id='eventsPage'>
            <h1 id='Title'>Upcoming Events</h1>
            <div id='eventData'>
                <div id='tableHead'>
                <div className='benfText'>Description</div>
                <div className='benfText'>Location</div>
                <div className='benfText buttonAid'>Date</div>
            </div>
            <div id='events'>
                {events.map((eevents,key) => (
                    <div className='member' key={key}>
                        
                        <div className='benfText'>{eevents.Descrip}</div>
                        <div className='benfText'>{eevents.Location}</div>
                        <div className='benfText'>{eevents.E_Date}</div>
                    </div>
              ))}
            </div>
        </div>

            <div >
                <button onClick={() => setPopUpT(true)}>Register</button>
            </div>
        {
        popUpT &&
        <div id='popUpA'>
            <h2>Event Registeration</h2>
            <>
            <div>
                    <div>
                        <label htmlFor='Email'>Email</label>
                        <input type="text" id="Email" value={email} onChange={(e) => setemail(e.target.value)}/>
                    </div>   
                    <div>
                        <label htmlFor='Pass'>Password</label>
                        <input type="text" id="Pass" value={pass} onChange={(e) => setpass(e.target.value)}/>
                    </div>   
            </div>
            <div>
                <label htmlFor='vehicle_select'>Select event</label>
                <select id="vehicle_select" value={descrp} onChange={(e) => setdescrp(e.target.value)}>
                    <option value="" disabled>Select description</option>
                    <option value="ter3a">ter3a</option>
                    <option value="7aflaa">7aflaa</option>
                    <option value="General">General Donations</option>
                </select>
            </div>
            </>
            <div>
            <button type="button" onClick={() => reset()}>Cancel</button>
            <button type="button" onClick={createregistration}>Save</button>
            </div>
        </div>
        }
        </div>

    )
}

export default Events;
