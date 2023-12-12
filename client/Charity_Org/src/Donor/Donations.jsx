
import { useEffect, useState } from 'react'
import "./Donations.css"
import moment from 'moment'

function Donations(props) {

    const [donations,setDonations] = useState([])
//khaly balak mn donation.Describeall fee el mapping
    
    const [popUpD,setPopUpD] = useState(false)
    const [selectD_Type,setSelectD_Type] = useState('')
    const [amount,setAmount] = useState('')
    const [date,setdate] = useState('')
    const [delivery,setdelivery] = useState('')
    const [purpose,setpurpose] = useState('')
    const [currency,setcurrency] = useState('')

    const [type,settype] = useState('')
    const [quality,setquality] = useState('')
    const [size,setsize] = useState('')
    const [capacity,setcapacity] = useState('')
    
    const [descr,setdescr] = useState('')
    const [quantity,setquantity] = useState('')
   
    const [populatedD,setPopulatedD] = useState(false)


    function reset() {
        setPopUpD(false)
        setSelectD_Type('')
        setPopulatedD(false)
        setAmount('')
       
        setSelectD_Type('')
        setcapacity('')
        setcurrency('')
        setdate('')
        setdelivery('')
        setdescr('')
        setpurpose('')
        setquality('')
        setquantity('')
        setsize('')
        settype('')
    }
  


    function createDonation() {

      setPopulatedD(true)
      if(selectD_Type === "Money" && amount.trim().length === 0) {
        setPopulatedD(false)
    }

    }

    useEffect(() => {
        if(populatedD) {
            let temp = donations
            temp[donations.length] = {"id":Participations.length+2,"Volunteer id": v_id,"Participation Type":ptype,"Bonus Type":btype,"Bonus Value":bvalue,"Date":date}
            setPopUpD(false)


            setPopulatedD(false)
        }
    },[populatedD])


    return (
    <div id='ParticipationsPage'>
        <div>
            <h1 id='Title'>Previous Donations</h1>
        </div>
        <div id='teamData'>
            <div id='tableHead'>
            
                <div className='benfText'>Description</div>
                <div className='benfText'>Quantity</div>
                <div className='benfText'>Amount</div>
                <div className='benfText'>Delivery</div>
                <div className='benfText buttonAid'>Date</div>
            </div>
            <div id='Participations'>
                {donations.map((donation,key) => (
                    <div className='member' key={key}>
                        
                        <div className='benfText'>{donation.Describeall}</div>
                        <div className='benfText'>{donation.Quantity}</div>
                        <div className='benfText'>{donation.Amount}</div>
                        <div className='benfText'>{donation.Delivery}</div>
                        <div className='benfText'>{donation.D_Date}</div>

                    </div>
                ))}
            </div>
        </div>
        <div>
          <button onClick={() => setPopUpD(true)}>New Donation</button>
        </div>
        {
        popUpD &&
        <div id='popUpA'>
            <h2>Create Donation</h2>
            
            <div>
                <label htmlFor='vehicle_select'>Select Donation type</label>
                <select id="vehicle_select" value={selectD_Type} onChange={(e) => setSelectD_Type(e.target.value)}>
                    <option value="" disabled>Select Donation type</option>
                    <option value="Money">Money Donations</option>
                    <option value="Clothes">Clothes</option>
                    <option value="General">General Donations</option>
                </select>
            </div>
            {selectD_Type === "Money" &&
            <>
                <div>
                    <div>
                        <label htmlFor='Amount'>Amount</label>
                        <input type="text" id="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='Date'>Date</label>
                        <input type="text" id="Date" value={date} onChange={(e) => setdate(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='Delivery'>Delivery</label>  
                        <input type="text" id="Delivery" value={delivery} onChange={(e) => setdelivery(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='Purpose'>Purpose</label>
                        <input type="text" id="Purpose" value={purpose} onChange={(e) => setpurpose(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='Currency'>Currency</label>
                        <input type="text" id="Currency" value={currency} onChange={(e) => setcurrency(e.target.value)}/>
                    </div>
                </div>
            </>
            }

            {selectD_Type === "Clothes" &&(
            <>
                <div>
                    <div>
                        <label htmlFor='Capacity'>Capacity</label>
                        <input type="text" id="Capacity" value={capacity} onChange={(e) => setcapacity(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='Date'>Date</label>
                        <input type="text" id="Date" value={date} onChange={(e) => setdate(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='Delivery'>Delivery</label>  
                        <input type="text" id="Delivery" value={delivery} onChange={(e) => setdelivery(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='Type'>Type</label>
                        <input type="text" id="Type" value={type} onChange={(e) => settype(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='Quality'>Quality</label>
                        <input type="text" id="Quality" value={quality} onChange={(e) => setquality(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='Size'>Size</label>
                        <input type="text" id="Size" value={size} onChange={(e) => setsize(e.target.value)}/>
                    </div>
                </div>
            </>
            )}

            {selectD_Type === "General" &&
            <>
                <div>
                    <div>
                        <label htmlFor='Quantity'>Quantity</label>
                        <input type="text" id="Quantity" value={quantity} onChange={(e) => setquantity(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='Date'>Date</label>
                        <input type="text" id="Date" value={date} onChange={(e) => setdate(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='Delivery'>Delivery</label>  
                        <input type="text" id="Delivery" value={delivery} onChange={(e) => setdelivery(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='Descr'>Describtion</label>
                        <input type="text" id="Descr" value={descr} onChange={(e) => setdescr(e.target.value)}/>
                    </div>
                </div>
                
            </>
            }

             
             
            <div>
                <button type="button" onClick={() => reset()}>Cancel</button>
                <button type="button" onClick={createDonation}>Save</button>
            </div>
        </div>
        }
    </div>
    )
}

  export default Donations