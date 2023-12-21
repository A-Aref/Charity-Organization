
import { useEffect, useState } from 'react'

import './Events.css'

function Events(props) {

    const [events,setEvents] = useState([])
    const [selectVolunteer,setSelectVolunteer] = useState("")

    useEffect(() =>   {fetch("/api/leader/getEvents")
    .then((response)=>{return response.json()})
    .then((data)=>{
      setEvents(JSON.parse(data))
    })
    },[])

    const [popUpT,setPopUpT] = useState(false)
    const [selectV_Type,setSelectV_Type] = useState("1")
    const [driverID,setDriverID] = useState("")
    const [drivers,setDrivers] = useState([])



    function select_Vehicle () {

    }


    useEffect( () => {
        let cargo = 1
        if (selectV_Type == "0")
        {
            cargo = 0
        }
        fetch("/api/leader/selectVechicle", {
            method: "POST",
            body:  JSON.stringify({Type:cargo}),
            headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
        })
        .then((response)=>{return response.json()})
        .then((data)=>{
          setDrivers(JSON.parse(data))
        })
    },[drivers])

    function sendRequest (id) {

    fetch("/api/leader/eventRequest", {
        method: "POST",
        body:  JSON.stringify({Event:id,V_ID:selectVolunteer}),
        headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
    })
    .then((response)=>{return response.json()})
    .then(() =>   {fetch("/api/leader/selectTeam", {
        method: "POST",
        body:  JSON.stringify(props.user),
        headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
    })
    .then((response)=>{return response.json()})
    .then((data)=>{
      props.setVolunteers(JSON.parse(data))
    })
    })

    }

    function reset () {
        setPopUpT(false)
        setSelectV_Type("")
        setDriverID("")
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
                    <div>
                        <select name='select_volunteer' value={selectVolunteer} onChange={(e) => setSelectVolunteer(e.target.value)}>
                            <option value="" disabled >Select volunteer for event</option>
                            {props.volunteers.map((volunteer) => (
                                volunteer.Event_Request === null && <option value={volunteer.V_ID} key={volunteer.V_ID}>{volunteer.FName} {volunteer.LName}</option>
                            ))}
                        </select>   
                        <button disabled={popUpT} onClick={() => sendRequest(event.ID)}>Send Request</button>
                    </div>
                    <button onClick={() => setPopUpT(true)} disabled={popUpT}>Add Transportation</button>
                </div> 
            </div>
        ))}
        {popUpT&&
        <div id='popUpT'>
            <h2>Add Transportation</h2>
            <div>
                <div>
                    <label htmlFor='vehicle_select'>Select Vehicle type</label>
                    <select id="vehicle_select" value={selectV_Type} onChange={(e) => setSelectV_Type(e.target.value)}>
                        <option value="1">Cargo</option>
                        <option value="0">People</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='avialable_vehicle'>Avialable vehicles</label>
                    <select name="avialable_vehicle" value={driverID} onChange={(e) => setDriverID(e.target.value)}>
                        <option value="" disabled >Select vehicle</option>
                        {drivers.map((driver,key) => (
                            <option value={driver.D_ID} key={key}>Plate: {driver.Plate},Name: {driver.FirstName},Capacity: {driver.Capacity} {driver.Is_Cargo.data[0] === 1 ? "kg" : ""}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <button type="button" onClick={() => reset()}>Cancel</button>
                <button type="button" onClick={select_Vehicle}>Select Vehicle</button>
            </div>
        </div>
        }
    </div>

    )
  }
  
  export default Events