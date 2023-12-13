
import { useEffect, useState } from 'react'

import './Events.css'

function Events(props) {

    const [events,setEvents] = useState([])
    useEffect(() =>   {fetch("/api/volunteer/getEvents")
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
        //select vehicle
    }
    
    useEffect( () => {
        let cargo = 1
        if (selectV_Type == "0")
        {
            cargo = 0
        }
        fetch("/api/volunteer/selectVechicle", {
            method: "POST",
            body:  JSON.stringify({Type:cargo}),
            headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
        })
        .then((response)=>{return response.json()})
        .then((data)=>{
          setDrivers(JSON.parse(data))
        })
    },[drivers])

    function reset () {
        setPopUpT(false)
        setSelectV_Type("")
        setDriverID("")
        setCapacity("")
    }

    function RequestBox() {
        const [isAccepted, setIsAccepted] = useState(false);
      
        const handleAccept = () => {
          setIsAccepted(true);
        };
      
        const handleReject = () => {
          setIsAccepted(false);
        };
      
        return (
          <div className="request-box">
            {isAccepted ? (
              <img src="data:image/jpeg;base64,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" alt="accepted" />
            ) : (
              <img src="data:image/jpeg;base64,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" alt="rejected" />
            )}
            <p>Would you like to participate in this event?</p>
            <button onClick={handleAccept}>Yes</button>
            <button onClick={handleReject}>No</button>
          </div>
        );
      }
      

    return (

    <div id='eventPage'>
        <h1>Upcoming Event</h1>
        <div className='Event'>
                <img src={null}  className='event_img' />
                <h2>{'clothes collection'}</h2>
                <div>Location: {'maadi'} </div> <div> Date: {('2023-05-20').slice(0,10)}</div>
                
                <div>
                    {1 && <button onClick={() => setPopUpT(true)} disabled={popUpT}>Add Transportation</button>}
                </div> 
            </div>
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
                            <option value={driver.D_ID} key={key}>ID:{driver.D_ID},  Capacity:{driver.Capacity}</option>
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
    
        <RequestBox />
    </div> 

    )
  }
  
  export default Events