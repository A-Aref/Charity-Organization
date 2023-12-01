
import { useEffect, useState } from 'react'
import "./Aid.css"

function Aid() {

    const [beneficiaries,setBeneficiaries] = useState([{key:0,"id": "V_19956", "name": "tofa Ahmad","points":19988,"phone":"01026908100",best:true},{key:1,"id": "V_156", "name": "Salah Mohamed","points":77777,"phone":"01026908200",best:false},{key:2,"id": "H_19956", "name": "tofa Ahmad","points":19988,"phone":"01026908100",best:false}])
    
    const [popUpB,setPopUpB] = useState(false)
    const [fName,setFName] = useState('')
    const [lName,setLName] = useState('')
    const [phone,setPhone] = useState('')
    const [status,setStatus] = useState('')
    const [address,setAddress] = useState('')
    const [doB,setDoB] = useState('')
    const [populatedB,setPopulatedB] = useState(false)

    const [popUpA,setPopUpA] = useState(false)
    const [quantity,setQuantity] = useState('')
    const [type,setType] = useState('')





    function addBeneficiary() {

        setPopulatedB(true)
        
        if(fName.trim().length === 0) {
            setPopulatedB(false)
        }
        if(lName.trim().length === 0) {
            setPopulatedB(false)
        }
        if(phone.trim().length === 0) {
            setPopulatedB(false)
        }
        if(email.trim().length === 0) {
            setPopulatedB(false)
        }
        if(address.trim().length === 0) {
            setPopulatedB(false)
        }
        if(doB.trim().length === 0) {
            setPopulatedB(false)
        }
        if(jDate.trim().length === 0) {
            setPopulatedB(false)
        }
        if(gender.trim().length === 0) {
            setPopulatedB(false)
        }
    }

    useEffect(() => {
        if(populatedB) {
            let temp = beneficiaries
            temp[beneficiaries.length] = {key:beneficiaries.length,"id": "V_1556", "name": "Abd-Allah Ahmad","points":0,"phone":"01026908500",best:false}
            setBeneficiaries(temp)
            setPopUpB(false)

            setAddress('')
            setDoB('')
            setFName('')
            setStatus('')
            setLName('')
            setPhone('')
            setPopulatedB(false)
        }
    },[populatedB])


    function createAid (id) {
        setPopUpA(true)

    }



    return (
    <div id='beneficiariesPage'>
        <div>
            <h1 id='Title'>Beneficiaries</h1>
        </div>
        <div id='teamData'>
            <div id='tableHead'>
                <div className='teamText'>ID</div>
                <div className='teamText'>Name</div>
                <div className='teamText'>Phone</div>
                <div className='teamText'>Best member</div>
            </div>
            <div id='beneficiaries'>
                {beneficiaries.map((member) => (
                    <div className='member' key={member.key}>
                        <div className='teamText'>{member.id}</div>
                        <div className='teamText'>{member.name}</div>
                        <div className='teamText'>{member.phone}</div>
                        <div className='teamText'>
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
                    <label htmlFor='Phone'>Phone</label>
                    <input type="text" id="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='Address'>Address</label>
                    <input type="text" id="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                </div>  
            </div>
            <div>
                <div>
                    <label htmlFor='DoB'>Date of Birth</label>
                    <input type="date" id="DoB" value={doB} onChange={(e) => setDoB(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='Status'>Status</label>
                    <input type="text" id="Status" value={status} onChange={(e) => setStatus(e.target.value)}/>
                </div>
            </div>
            <div>
                <button type="button" onClick={() => setPopUpB(false)}>Cancel</button>
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
                <button type="button" onClick={() => setPopUpA(false)}>Cancel</button>
                <button type="button" onClick={addBeneficiary}>Save</button>
            </div>
        </div>
        }
        
    </div>
    )
  }
  
  export default Aid