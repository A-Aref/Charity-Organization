
import { useEffect, useState } from 'react'

import './Events.css'

function Events(props) {

    const [events,setEvents] = useState([])

    
    const [descrip,setdescrip] = useState('')
    const [url,seturl] = useState('')
    const [location,setlocation] = useState('')
    const [date,setdate] = useState('')

    const [descripu,setdescripu] = useState('')
    const [urlu,seturlu] = useState('')
    const [locationu,setlocationu] = useState('')
    const [dateu,setdateu] = useState('')
    const [idu,setidu] = useState('')

    const [populated,setPopulated] = useState(false)
    const [populatedu,setPopulatedu] = useState(false)
    const [popUp,setPopUp] = useState(false)
    const [popUpu,setPopUpu] = useState(false)


    function upbutt(id)
    {
        setPopUpu(true)
        setidu(id)
    }
    function addevent() {

        setPopulated(true)
        
        if(descrip.trim().length === 0) {
            setPopulated(false)
            alert("Please enter a description.");
        }else
        if(location.trim().length === 0) {
            setPopulated(false)
            alert("Please enter a location.");
        }else
        if(date=='') {
            setPopulated(false)
            alert("Please choose a date.");
        }else
        if (!/^[a-zA-Z]+$/.test(descrip.trim())) {
            setPopulated(false);
            alert("Please enter a valid descrip.");
          }
    }
    function updateevent() {

        setPopulatedu(true)
        
        if(descripu.trim().length === 0) {
            setPopulatedu(false)
            alert("Please enter a description.");
        }else
        if(locationu.trim().length === 0) {
            setPopulatedu(false)
            alert("Please enter a location.");
        }else
        if(dateu=='') {
            setPopulatedu(false)
            alert("Please choose a date.");
        }else
        if (!/^[a-zA-Z]+$/.test(descripu.trim())) {
            setPopulatedu(false);
            alert("Please enter a valid descrip.");
          }
    }


    useEffect(() =>   {
        fetch("/api/leader/getEvents", {
            method: "POST",
            body:  JSON.stringify({date:"1950-01-01"}),
            headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
        })
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
            .then(()=>{
                fetch("/api/leader/getEvents", {
                    method: "POST",
                    body:  JSON.stringify({date:"1950-01-01"}),
                    headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
                })
                .then((response)=>{return response.json()})
                .then((data)=>{
                setEvents(JSON.parse(data))
                })
            })  

            setdescrip('')
            seturl('')
            setlocation('')
            setdate('')
            setPopulated(false)
        }
    },[populated])

    useEffect(() => {
        if(populatedu) {
            
            let newe = {"Descrip": descripu,"url":urlu,"Location":locationu,"E_Date":dateu,"E_ID":idu}
            

            fetch("/api/Admin/updateevent", {
                method: "POST",
                body:  JSON.stringify(newe),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})
            .then(()=>{
                fetch("/api/leader/getEvents", {
                    method: "POST",
                    body:  JSON.stringify({date:"1950-01-01"}),
                    headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
                })
                .then((response)=>{return response.json()})
                .then((data)=>{
                setEvents(JSON.parse(data))
                })
            })  

            setdescripu('')
            seturlu('')
            setlocationu('')
            setdateu('')
            setPopUpu(false)
            setPopulatedu(false)
        }
    },[populatedu])
   

    function reset () {
        setPopUp(false)
        seturl("")
        setdate("")
        setlocation("")
        setdescrip("")
        setPopulated(false)
    }

    function resetu () {
        setPopUpu(false)
        seturlu("")
        setdateu("")
        setlocationu("")
        setdescripu("")
        setPopulatedu(false)
    }


    return (

    <div id='eventPage'>
        <div>
            <h1>Events</h1>
        </div>
        <div>
        <button onClick={() => setPopUp(true)} disabled={popUp}>Add Event</button>
        </div>
        <br />
        <br />
        {events.map((event,key)=> (
            <div key={key} className='Event'>
                <img src={event.url}  className='event_img' />
                <h2>{event.Descrip}</h2>
                <div>Location: {event.Location} </div> <div> Date: {(event.E_Date).slice(0,10)}</div>
                <div>
                <button onClick={()=>upbutt(event.E_ID)} disabled={popUpu}>Update</button>
                </div> 
            </div>
        ))}
        
        {popUp&&
        <div id='popUpu'>
            <h2>Add Event</h2>
            <div>
                <div>
                    <label htmlFor='descrip'>description</label>
                    <input type="text" id="descrip" value={descrip} onChange={(e) => setdescrip(e.target.value)}/>

                    <label htmlFor='url'>url</label>
                    <input type="url" id="url" value={url} onChange={(e) => seturl(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='location'>Location</label>
                    <input type="text" id="location" value={location} onChange={(e) => setlocation(e.target.value)}/>

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
                    <input type="text" id="descrip" value={descripu} onChange={(e) => setdescripu(e.target.value)}/>

                    <label htmlFor='url'>url</label>
                    <input type="url" id="url"  value={urlu} onChange={(e) => seturlu(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='location'>Location</label>
                    <input type="text" id="location"  value={locationu} onChange={(e) => setlocationu(e.target.value)}/>

                    <label htmlFor='date'>Date</label>
                    <input type="date" id="date" value={dateu} onChange={(e) => setdateu(e.target.value)}/>
                </div>
            </div>
            <div>
                <button type="button" onClick={() => resetu()}>Cancel</button>
                <button type="button" onClick={updateevent}>Save</button>
            </div>
        </div>
        }
    </div>

    )
  }
  
  export default Events