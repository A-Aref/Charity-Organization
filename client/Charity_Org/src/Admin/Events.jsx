
import { useEffect, useState } from 'react'

import './Events.css'

function Events(props) {

    const [events,setEvents] = useState([])

    
    const [descrip,setdescrip] = useState('')
    const [url,seturl] = useState('')
    const [location,setlocation] = useState('')
    const [date,setdate] = useState('')
    const [populated,setPopulated] = useState(false)
    const [populatedu,setPopulatedu] = useState(false)
    const [popUp,setPopUp] = useState(false)
    const [popUpu,setPopUpu] = useState(false)


    function addevent() {

        setPopulated(true)
        
        if(descrip.trim().length === 0) {
            setPopulated(false)
        }
        if(url.trim().length === 0) {
            setPopulated(false)
        }
        if(location.trim().length === 0) {
            setPopulated(false)
        }
    }
    function updateevent() {

        setPopulatedu(true)
        
        if(descrip.trim().length === 0) {
            setPopulatedu(false)
        }
        if(url.trim().length === 0) {
            setPopulatedu(false)
        }
        if(location.trim().length === 0) {
            setPopulatedu(false)
        }
    }
    useEffect(() =>   {fetch("/api/leader/getEvents")
    .then((response)=>{return response.json()})
    .then((data)=>{
      setEvents(JSON.parse(data))
    })
    },[])


    useEffect(() => {
        if(populated) {
            
            let newe = {"Descrip": descrip,"url":url,"Location":location,"E_Date":date}
            setPopUp(false)

            fetch("/api/Admin/addevent", {
                method: "POST",
                body:  JSON.stringify(newe),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})
            .then((data)=>{
                fetch("/api/leader/getEvents")
                .then((response)=>{return response.json()})
                .then((data)=>{
                  setEvents(JSON.parse(data))
                })
            })  

            setdescrip('')
            seturl('')
            setlocation('')
            setPopulated(false)
        }
    },[populated])

    // useEffect(() => {
    //     if(populatedu) {
            
    //         let newe = {"Descrip": descrip,"url":url,"Location":location,"E_Date":date}
    //         setPopUpu(false)

    //         fetch("/api/Admin/updateevent", {
    //             method: "POST",
    //             body:  JSON.stringify(newe),
    //             headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
    //         })
    //         .then((response)=>{return response.json()})
    //         .then((data)=>{
    //             fetch("/api/leader/getEvents")
    //             .then((response)=>{return response.json()})
    //             .then((data)=>{
    //               setEvents(JSON.parse(data))
    //             })
    //         })  

    //         setdescrip('')
    //         seturl('')
    //         setlocation('')
    //         setPopulatedu(false)
    //     }
    // },[populatedu])
   

    function reset () {
        setPopUp(false)
        seturl("")
        setdate("")
        setlocation("")
        setdescrip("")
        setPopulated(false)
    }


    return (

    <div id='eventPage'>
        <div>
            <h1>Events</h1>
        </div>
        {events.map((event,key)=> (
            <div key={key} className='Event'>
                <img src={event.url}  className='event_img' />
                <h2>{event.Descrip}</h2>
                <div>Location: {event.Location} </div> <div> Date: {(event.E_Date).slice(0,10)}</div>
                <div>
                <button onClick={() => setPopUpu(true)} disabled={popUpu}>Update</button>
                    {/* <div>
                        <select name='select_volunteer' value={selectVolunteer} onChange={(e) => setSelectVolunteer(e.target.value)}>
                            <option value="" disabled >Select volunteer for event</option>
                            {props.volunteers.map((volunteer) => (
                                volunteer.Event_Request === null && <option value={volunteer.V_ID} key={volunteer.V_ID}>{volunteer.FName} {volunteer.LName}</option>
                            ))}
                        </select>   
                        <button disabled={popUpT} onClick={() => sendRequest(event.ID)}>Send Request</button>
                    </div>
                    <button onClick={() => setPopUpT(true)} disabled={popUpT}>Add Transportation</button> */}
                </div> 
            </div>
        ))}
        <div>
        <button onClick={() => setPopUp(true)} disabled={popUp}>Add Event</button>
        </div>
        {popUp&&
        <div id='popUpT'>
            <h2>Add Event</h2>
            <div>
                <div>
                    <label htmlFor='descrip'>description</label>
                    <input type="text" id="descrip" value={descrip} onChange={(e) => setdescrip(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='url'>url</label>
                    <input type="url" id="url" value={url} onChange={(e) => seturl(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='location'>Location</label>
                    <input type="text" id="location" value={location} onChange={(e) => setlocation(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='date'>Date</label>
                    <input type="date" id="date" value={date} onChange={(e) => setdate(e.target.value)}/>
                </div>
            </div>
            <div>
                <button type="button" onClick={() => reset()}>Cancel</button>
                <button type="button" onClick={addevent}>Save</button>
            </div>
        </div>
        }

        {popUpu&&
        <div id='popUpu'>
            <h2>Update Event</h2>
            <div>
                <div>
                    <label htmlFor='descrip'>description</label>
                    <input type="text" id="descrip" placeholder={descrip} value={descrip} onChange={(e) => setdescrip(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='url'>url</label>
                    <input type="url" id="url" placeholder={url} value={url} onChange={(e) => seturl(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='location'>Location</label>
                    <input type="text" id="location" placeholder={location} value={location} onChange={(e) => setlocation(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='date'>Date</label>
                    <input type="date" id="date" placeholder={date} value={date} onChange={(e) => setdate(e.target.value)}/>
                </div>
            </div>
            <div>
                <button type="button" onClick={() => reset()}>Cancel</button>
                <button type="button" onClick={updateevent}>Save</button>
            </div>
        </div>
        }
    </div>

    )
  }
  
  export default Events