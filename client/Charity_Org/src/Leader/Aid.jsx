
import { useEffect, useState } from 'react'
import "./Aid.css"

function Aid() {

    const [beneficiaries,setBeneficiaries] = useState([{"id":"1","FirstName": "Abd-Allah","LastName":"Ahmad","State":"poor","Address":"maadi","L_A_Date":"12/3/2021"},{"id":"2","FirstName": "Ahmad","LastName":"Ahmad","State":"disable","Address":"tagamo3","L_A_Date":"4/3/2021"},{"id":"3","FirstName": "salah","LastName":"shawky","State":"poor","Address":"maadi","L_A_Date":"12/3/2020"}])
    
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


    const date = (new Date()).toLocaleDateString()


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
            temp[beneficiaries.length] = {"id":beneficiaries.length+2,"FirstName": fName,"LastName":lName,"State":status,"Address":address,"L_A_Date":date}
            setBeneficiaries(temp)
            setPopUpB(false)

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
                {beneficiaries.map((member) => (
                    <div className='member' key={member.id}>
                        <div className='benfText idtable'>{member.id}</div>
                        <div className='benfText'>{`${member.FirstName}  ${member.LastName}`}</div>
                        <div className='benfText'>{member.State}</div>
                        <div className='benfText'>{member.L_A_Date}</div>
                        <div className='benfText buttonAid'>
                            <button type="button" className='createAid' onClick={() => createAid(member.id)} disabled={popUpA || popUpB}>Create Aid</button>
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