
import { useEffect, useState } from 'react'

import './Events.css'

function Events(props) {

    const [events,setEvents] = useState([{"ID":858,"name":"tr3a","image":"https://resala.org/wp-content/uploads/2019/12/%D8%A7%D8%B5%D8%AF%D9%82%D8%A7%D8%A1-%D8%A7%D9%84%D8%A8%D9%8A%D8%A6%D8%A9.jpg","location":"maadi"}])
    const [selectVolunteer,setSelectVolunteer] = useState("")

    const [popUpT,setPopUpT] = useState(false)
    const [selectV_Type,setSelectV_Type] = useState("")
    const [capacity,setCapacity] = useState("")
    const [driverID,setDriverID] = useState("")
    const [driverIDs,setDriverIDs] = useState(["885","75875","7585","7585","7585","7585","7585","7585","7585","7585","7585","7585","7585","7585","7585"])


    function select_Vehicle () {
        //select vehicle
    }


    function reset () {
        setPopUpT(false)
        setSelectV_Type("")
        setDriverID("")
        setCapacity("")
    }


    return (

    <div>
        {events.map((event)=> (
            <div key={event.ID} className='Event'>
                <img src={event.image}  className='event_img' />
                <h2>{event.name}</h2>
                <div>
                    <div>
                        <select name='select_volunteer' value={selectVolunteer} onChange={(e) => setSelectVolunteer(e.target.value)}>
                            <option value="" disabled >Select volunteer for event</option>
                            {props.volunteers.map((volunteer) => (
                                volunteer.best === false && <option value={volunteer.id} key={volunteer.id}>{volunteer.id}</option>
                            ))}
                        </select>   
                        <button disabled={popUpT}>Send request</button>
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
                        <option value="" disabled >Select vehicle type</option>
                        <option value="Cargo">Cargo</option>
                        <option value="People">People</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='avialable_vehicle'>Avialable vehicles</label>
                    <select name="avialable_vehicle" value={driverID} onChange={(e) => setDriverID(e.target.value)}>
                        <option value="" disabled >Select vehicle</option>
                        {driverIDs.map((driver) => (
                            <option value={driver} key={driver}>{driver}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <label>Capacity</label>
                    <h3>{capacity}</h3>
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