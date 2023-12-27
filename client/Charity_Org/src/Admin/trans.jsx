
import { useEffect, useState } from 'react'
import "./trans.css"

function trans() {
    const [transportation,settransportation] = useState([])
    const [phone,setphone] = useState('')
    const [plate,setplate] = useState('')
    const [iscargo,setiscargo] = useState(0)
    const [prodyear,setprodyear] = useState('')
    const [capacity,setcapacity] = useState(0)
    const [fname,setfname] = useState('')
    const [lname,setlname] = useState('')

    function addtrans() {

        setPopulatedB(true)
        
        if(fname.trim().length === 0) {
            setPopulatedB(false)
        }
        if(lname.trim().length === 0) {
            setPopulatedB(false)
        }
        if(phone.trim().length === 0) {
            setPopulatedB(false)
        }
        if(plate.trim().length === 0) {
            setPopulatedB(false)
        }
        if(prodyear.trim().length === 0) {
            setPopulatedB(false)
        }
        if(capacity.trim().length === 0) {
            setPopulatedB(false)
        }
        if(iscargo.trim().length === 0) {
            setPopulatedB(false)
        }
    }

    function reset() {
        setphone('')
        setplate('')
        setiscargo(0)
        setlname('')
        setfname('')
        setprodyear('')
        setcapacity(0)

        setPopUpB(false)
        setPopulatedB(false)
        
    }

    const [popUpB,setPopUpB] = useState(false)
    const [populatedB,setPopulatedB] = useState(false)

    useEffect(() =>   {
        fetch("/api/leader/selecttrans")
        .then((response)=>{return response.json()})
        .then((data)=>{settransportation(JSON.parse(data))
        console.log(JSON.parse(data))})
    },[])


    useEffect(() => {
        if(populatedB) {
            let cargo= 1
            let trips=0
            let nevent=null
            if (iscargo === "0")
            {
                cargo = 0
            }
            let addedB = {"FirstName": fname,"LastName":lname,"Phone":phone,"Plate":plate, "Production_Year": prodyear,"Is_Cargo": cargo, "Capacity": capacity,"Total_Trips":trips,"next_event":nevent}
            setPopUpB(false)

            fetch("/api/leader/addtrans", {
                method: "POST",
                body:  JSON.stringify(addedB),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})
            .then((data)=>{
                fetch("/api/leader/selecttrans")
                .then((response)=>{return response.json()})
                .then((data)=>{
                  settransportation(JSON.parse(data))
                })
            })  

            setplate('')
            setfname('')
            setphone('')
            setlname('')
            setprodyear('')
            setiscargo('')
            setcapacity('')
            setPopulatedB(false)
        }
    },[populatedB])


    return (
        <div id='beneficiariesPage'>
            <div>
                <h1 id='Title'>Trans</h1>
            </div>
            <div id='teamData'>
                <div id='tableHead'>
                    <div className='benfText idtable'>ID</div>
                    <div className='benfText'>Name</div>
                    <div className='benfText'>Capacity</div>
                    <div className='benfText'>Use</div>
                </div>
                <div id='beneficiaries'>
                    {transportation.map((member,key) => (
                        <div className='member' key={key}>
                            <div className='benfText idtable'>{member.D_ID}</div>
                            <div className='benfText'>{`${member.FirstName}  ${member.LastName}`}</div>
                            <div className='benfText'>{member.Capacity}</div>
                            <div className='benfText'>{member.Is_Cargo.data[0] === 0 ? "People" : "Cargo"}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div id='addbenef'>
                <button type="button" onClick={() => setPopUpB(true)} >Add trans</button>
            </div>
    
            { 
            popUpB &&
            <div id='popUpB'>
            <h2>Create Transportation</h2>
            
                <div>
                    <div>
                        <label htmlFor='phone'>Phone</label>
                        <input type="tel" id="phone" value={phone} onChange={(e) => setphone(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='plate'>Plate</label>
                        <input type="text" id="plate" value={plate} onChange={(e) => setplate(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <div id='Gender'>
                        <p id='cargo'>Use</p>
                        <div>
                            <label htmlFor="Cargo">Cargo</label>
                            <input type="radio" name="cargo" id="Cargo" value='1' checked={iscargo === '1'} onChange={(e) => setiscargo(e.target.value)}/>
                            <label htmlFor="People">People</label>
                            <input type="radio" name="cargo" id="People" value='0' checked={iscargo === '0'} onChange={(e) => setiscargo(e.target.value)}/>
                        </div>
                    </div> 
                    <div>
                        <label htmlFor='prodyear'>Production Year</label>
                        <input type="text" id="prodyear" value={prodyear} onChange={(e) => setprodyear(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='Fname'>First Name</label>
                        <input type="text" id="fname" value={fname} onChange={(e) => setfname(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='lname'>Last Name</label>
                        <input type="text" id="lname" value={lname} onChange={(e) => setlname(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='capacity'>Capacity</label>
                        <input type="number" id="capacity" value={capacity} onChange={(e) => setcapacity(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <button type="button" onClick={() => reset()}>Cancel</button>
                    <button type="button" onClick={addtrans}>Save</button>
                </div>
            </div>
            }
    
        </div>
        )

    /*-----------------------------------------------------------------------------------------------------------------------*/
    
  }
  
  export default trans