import { useEffect, useState } from 'react'
import moment from 'moment'
import './Events.css'


function Events(props) {

    const [events, setEvents] = useState([])
    

    const [popUpT, setPopUpT] = useState(false)
    const [ID,setID]=useState("")
    
 
    const [populatedE,setPopulatedE] = useState(false)
    

    const date = moment().format('YYYY-MM-DD')

    function reset() {
        setPopUpT(false);
           
        setID("")
        setPopulatedE("")
       
    }
   
   






    useEffect(() =>   {
        fetch("/api/Donor/upcoming_events", {
            method: "POST",
            body:  JSON.stringify({date:date}),
            headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
        })
        .then((response)=>{return response.json()})
        .then((data)=>{setEvents(JSON.parse(data))
        console.log(JSON.parse(data))})
    },[])

    
    function createregistration () {
        setPopulatedE(true)
        
  
  if(ID.trim().length === 0) {
    setPopulatedE(false)
}
}



useEffect(() => {

    if(populatedE) {
        var temp = {"E_ID":ID,"DonorID":props.user.DonorID}
     
        fetch("/api/Donor/event_registeration", {
            method: "POST",
            body:  JSON.stringify(temp),
            headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
        })
        .then((response)=>{return response.json()})

        setPopUpT(false)
        setID('')
        setPopulatedE(false)
    }
},[populatedE])








    return (
        <div id='eventsPage'>
            <h1 id='Title'>Upcoming Events</h1>
            <div id='eventData'>
                <div id='tableHead'>
                <div className='benfText'>Event_ID</div>
                <div className='benfText'>Description</div>
                <div className='benfText'>Location</div>
                <div className='benfText buttonAid'>Date</div>
            </div>
            <div id='events'>
                {events.map((event,key) => (
                    <div className='member' key={key}>
                        <div className='benfText'>{event.E_ID}</div>
                        <div className='benfText'>{event.Descrip}</div>
                        <div className='benfText'>{event.Location}</div>
                        <div className='benfText'>{(event.E_Date).slice(0,10)}</div>
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
                <label htmlFor='vehicle_select'>Select event</label>
                <select id="vehicle_select" value={ID} onChange={(e) => setID(e.target.value)}>
                    <option value="" disabled>Select Event ID</option>
                    {events.map((events,key) => (
                      <option value={events.E_ID} key={key}>{events.E_ID} </option>
                ))}
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
