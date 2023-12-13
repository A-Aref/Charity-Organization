import { useEffect, useState } from 'react'
import './Events.css'
import moment from 'moment'

function Events(props) {

    const [events, setEvents] = useState([])
    

    const [popUpT, setPopUpT] = useState(false)
   
    const [email, setemail] = useState("")
    const [pass, setpass] = useState("")
    const [populatedE,setPopulatedE] = useState(false)
    



    function reset() {
        setPopUpT(false);
        setpass("")
        setemail("")
       
    }
    function createregestration () {
        setPopulatedE(true)
        if(pass.trim().length === 0) {
          setPopulatedE(false)
    }

    if(email.trim().length === 0) {
        setPopulatedE(false)
  }
}

    return (
        <div>
            <h1>Upcoming Events</h1>
            <div id='teamData'>
                <div id='tableHead'>
                <div className='benfText'>Description</div>
                <div className='benfText'>Location</div>
                <div className='benfText buttonAid'>Date</div>
            </div>
            <div id='Participations'>
                {events.map((eevents,key) => (
                    <div className='member' key={key}>
                        
                        <div className='benfText'>{eevents.Descrip}</div>
                        <div className='benfText'>{eevents.Location}</div>
                        <div className='benfText'>{eevents.E_Date}</div>
                    </div>
              ))}
            </div>
        </div>

            <div className='buttonContainer'>
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
            </>
            <div className='buttonContainer'>
            <button type="button" onClick={() => reset()}>Cancel</button>
            <button type="button" onClick={createregestration}>Save</button>
            </div>
        </div>
        }
        </div>

    )
}

export default Events;
