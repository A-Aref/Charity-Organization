
import { useEffect, useState } from 'react'
import moment from 'moment'
import "./Aid.css"

function Aid() {

    const [beneficiaries,setBeneficiaries] = useState([])
    
    const [popUpB,setPopUpB] = useState(false)
    const [fName,setFName] = useState('')
    const [lName,setLName] = useState('')
    const [status,setStatus] = useState('')
    const [address,setAddress] = useState('')
    const [populatedB,setPopulatedB] = useState(false)

    const [popUpA,setPopUpA] = useState(false)
    const [quantity,setQuantity] = useState('')
    const [type,setType] = useState('')
    const [b_ID,setB_ID] = useState('')
    const [populatedA,setPopulatedA] = useState(false)


    const date = moment().format('YYYY-MM-DD')

    useEffect(() =>   {
        fetch("/api/leader/selectBenef")
        .then((response)=>{return response.json()})
        .then((data)=>{setBeneficiaries(JSON.parse(data))})
    },[])



    function addBeneficiary() {

        setPopulatedB(true)
        
        if(fName.trim().length === 0) {
            setPopulatedB(false)
        }
        if(lName.trim().length === 0) {
            setPopulatedB(false)
        }
        if(status.trim().length === 0) {
            setPopulatedB(false)
        }
        if(address.trim().length === 0) {
            setPopulatedB(false)
        }
    }

    useEffect(() => {
        if(populatedB) {
            let temp = beneficiaries
            let addedB = {"FirstName": fName,"LastName":lName,"State":status,"Address":address}
            setPopUpB(false)

            fetch("/api/leader/addBenef", {
                method: "POST",
                body:  JSON.stringify(addedB),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})
            .then((data)=>{
                fetch("/api/leader/selectBenef")
                .then((response)=>{return response.json()})
                .then((data)=>{
                  setBeneficiaries(JSON.parse(data))
                })
            })  

            setAddress('')
            setFName('')
            setStatus('')
            setLName('')
            setPopulatedB(false)
        }
    },[populatedB])


    function addAid() {

        setPopulatedA(true)
        
        if(type.trim().length === 0) {
            setPopulatedA(false)
        }
        if(quantity.trim().length === 0) {
            setPopulatedA(false)
        }
    }

    useEffect(() => {
        if(populatedA) {
            var temp = {"A_Type":type,"A_Date":date,"Quantity":quantity,"B_ID":b_ID}
            //createAid() fetch
            fetch("/api/leader/createAid", {
                method: "POST",
                body:  JSON.stringify(temp),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})

            setPopUpA(false)

            setQuantity('')
            setType('')
            setB_ID('')
            setPopulatedA(false)
        }
    },[populatedA])


    function createAid (id) {
        setPopUpA(true)
        setB_ID(id)

    }

    function reset() {
        setAddress('')
        setFName('')
        setStatus('')
        setLName('')
        setQuantity('')
        setType('')
        setB_ID('')
        setPopUpB(false)
        setPopUpA(false)
        setPopulatedB(false)
        setPopulatedA(false)
    }



    return (
    <div id='beneficiariesPage'>
        <div>
            <h1 id='Title'>Beneficiaries</h1>
        </div>
        <div id='teamData'>
            <div id='tableHead'>
                <div className='benfText idtable'>ID</div>
                <div className='benfText'>Name</div>
                <div className='benfText'>State</div>
                <div className='benfText'>Last Aid Date</div>
                <div className='benfText buttonAid'>Create Aid</div>
            </div>
            <div id='beneficiaries'>
                {beneficiaries.map((member,key) => (
                    <div className='member' key={key}>
                        <div className='benfText idtable'>{member.ID}</div>
                        <div className='benfText'>{`${member.FirstName}  ${member.LastName}`}</div>
                        <div className='benfText'>{member.State}</div>
                        <div className='benfText'>{member.Last_AID_Date != null ? (member.Last_AID_Date).slice(0,10) : "-"}</div>
                        <div className='benfText buttonAid'>
                            <button type="button" className='createAid' onClick={() => createAid(member.ID)} disabled={popUpA || popUpB}>Create Aid</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div id='addbenef'>
            <button type="button" onClick={() => setPopUpB(true)} disabled={popUpA || popUpB}>Add Beneficiary</button>
        </div>

        {
        popUpB &&
        <div id='popUpB'>
            <h2>Add Beneficiary</h2>
            <div>
                <div>
                    <label htmlFor='First_Name'>First Name</label>
                    <input type="text" id="First_Name" value={fName} onChange={(e) => setFName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='Last_Name'>Last Name</label>
                    <input type="text" id="Last_Name" value={lName} onChange={(e) => setLName(e.target.value)}/>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor='Address'>Address</label>
                    <input type="text" id="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='Status'>Status</label>
                    <input type="text" id="Status" value={status} onChange={(e) => setStatus(e.target.value)}/>
                </div>
            </div>
            <div>
                <button type="button" onClick={() => reset()}>Cancel</button>
                <button type="button" onClick={addBeneficiary}>Save</button>
            </div>
        </div>
        }

        
        {
        popUpA &&
        <div id='popUpA'>
            <h2>Create Aid</h2>
            <div>
                <div>
                    <label htmlFor='type'>Type</label>
                    <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='quantity'>Quantity</label>
                    <input type="text" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                </div>
            </div>
            <div>
                <button type="button" onClick={() => reset()}>Cancel</button>
                <button type="button" onClick={addAid}>Save</button>
            </div>
        </div>
        }
        
    </div>
    )
  }
  
  export default Aid