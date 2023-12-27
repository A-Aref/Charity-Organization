
import { useEffect, useState } from 'react'
import "./Donations.css"
import moment from 'moment'

function Donations(props) {

    const [moneydonation,setmoneyDonations] = useState([])
    const [generaldonation,setgeneralDonations] = useState([])
    const [clothes,setclothes] = useState([])

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

    const currdate = moment().format('YYYY-MM-DD')
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
    
    useEffect(() =>   {
        fetch("/api/Donor/old_money_donations", {
            method: "POST",
            body:  JSON.stringify({"donorid":props.user.DonorID,"date":currdate}),
            headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
        })
        .then((response)=>{return response.json()})
        .then((data)=>{setmoneyDonations(JSON.parse(data))
        console.log(JSON.parse(data))})
    },[])

    useEffect(() =>   {
        fetch("/api/Donor/old_general_donations", {
            method: "POST",
            body:  JSON.stringify({donorid:props.user.DonorID,"date":currdate}),
            headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
        })
        .then((response)=>{return response.json()})
        .then((data)=>{setgeneralDonations(JSON.parse(data))
        console.log(JSON.parse(data))})
    },[])

    
    useEffect(() =>   {
        fetch("/api/Donor/old_clothes_donations", {
            method: "POST",
            body:  JSON.stringify({donorid:props.user.DonorID,"date":currdate}),
            headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
        })
        .then((response)=>{return response.json()})
        .then((data)=>{setclothes(JSON.parse(data))
        console.log(JSON.parse(data))})
    },[])

    
    function createDonation() {

    setPopulatedD(true)
      if(selectD_Type === "Money") {
        
      
      if(amount.trim().length === 0) {
        setPopulatedD(false)
        
    }
    if( date.trim().length === 0) {
        setPopulatedD(false)
        
    }
    if(delivery.trim().length === 0) {
        setPopulatedD(false)
        
    }
    if(purpose.trim().length === 0) {
        setPopulatedD(false)
        
    }
    if(currency.trim().length === 0) {
        setPopulatedD(false)
        
    }
}


if(selectD_Type === "Clothes") {
    
  
  if(quality.trim().length === 0) {
    setPopulatedD(false)
    
}
if( date.trim().length === 0) {
    setPopulatedD(false)
    
}
if(delivery.trim().length === 0) {
    setPopulatedD(false)
    
}
if(capacity.trim().length === 0) {
    setPopulatedD(false)
    
}
if(size.trim().length === 0) {
    setPopulatedD(false)
    
}
if(type.trim().length === 0) {
    setPopulatedD(false)
    
}
}


if(selectD_Type === "General") {
    
  
    if(quantity.trim().length === 0) {
      setPopulatedD(false)
      
  }
  if( date.trim().length === 0) {
      setPopulatedD(false)
      
  }
  if(delivery.trim().length === 0) {
      setPopulatedD(false)
      
  }
  if(descr.trim().length === 0) {
      setPopulatedD(false)
      
  }
  
  }

}





    useEffect(() => {
        if(populatedD) {
           if(selectD_Type==="Money")
           {
            var temp1=0
            if (delivery==="1")
            {temp1=1}
            var temp = {"D_Date":date,"Delivery":temp1,"Purpose":purpose,"Currency":currency,"Amount":amount,"DonorID":props.user.DonorID}
          
            fetch("/api/Donor/createmoneydonation", {
                method: "POST",
                body:  JSON.stringify(temp),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})
            
            

            var hazl2oom6 = {"Quantity":amount,"Type":"Money"}
            fetch("/api/Donor/T_Total_assets", {
                method: "POST",
                body:  JSON.stringify(hazl2oom6),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})

            reset();

           
            
            
    
         

           }
           if(selectD_Type==="Clothes")
           {
            var temp1=0
            if (delivery==="1")
            {temp1=1}
            var temp = {"D_Date":date,"Delivery":temp1,"Size":size,"Quality":quality,"C_Type":type,"Capacity":capacity,"DonorID":props.user.DonorID}
          
            fetch("/api/Donor/createclothesdonation", {
                method: "POST",
                body:  JSON.stringify(temp),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})

           
            var hazl2oom6 = {"Quantity":capacity,"Type":"Clothes"}
            fetch("/api/Donor/T_Total_assets", {
                method: "POST",
                body:  JSON.stringify(hazl2oom6),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})

            reset();
           }
           if(selectD_Type==="General")
           {
            var temp1=0
            if (delivery==="1")
            {temp1=1}
            var temp = {"D_Date":date,"Delivery":temp1,"Descrip":descr,"Quantity":quantity,"DonorID":props.user.DonorID}
          
            fetch("/api/Donor/creategeneraldonation", {
                method: "POST",
                body:  JSON.stringify(temp),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})
            
              
            var hazl2oom6 = {"Quantity":quantity,"Type":descr}
            fetch("/api/Donor/T_Total_assets", {
                method: "POST",
                body:  JSON.stringify(hazl2oom6),
                headers: { 'Accept': 'application/json','Content-Type': 'application/json'}, 
            })
            .then((response)=>{return response.json()})





            reset();
           }
    }
    },[populatedD])

   


    return (
    <div id='ParticipationsPage'>
        <div>
            <h1 id='Title'>Previous Donations</h1>
        </div>
        <div id='teamData'>
            <div id='tableHead'>
            
                <div className='benfText'>Amount</div>
                <div className='benfText'>Currency</div>
                <div className='benfText'>Purpose</div>
                <div className='benfText'>Delivery</div>
                <div className='benfText buttonAid'>Date</div>
            </div>
            <div id='Participations'>
                {moneydonation.map((moneydonation,key) => (
                    <div className='member' key={key}>
                        
                        <div className='benfText'>{moneydonation.Amount}</div>
                        <div className='benfText'>{moneydonation.Currency}</div>
                        <div className='benfText'>{moneydonation.Purpose}</div>
                        <div className='benfText'>{moneydonation.Delivery.data[0]}</div>
                        <div className='benfText'>{(moneydonation.D_Date).slice(0,10)}</div>

                    </div>
                ))}
            </div>
        </div>


        <div id='teamData'>
            <div id='tableHead'>
            
                <div className='benfText'>Description</div>
                <div className='benfText'>Quantity</div>
                <div className='benfText'>Delivery</div>
                <div className='benfText buttonAid'>Date</div>
            </div>
            <div id='Participations'>
                {generaldonation.map((generaldonation,key) => (
                    <div className='member' key={key}>
                        
                        <div className='benfText'>{generaldonation.Descrip}</div>
                        <div className='benfText'>{generaldonation.Quantity}</div>
                        <div className='benfText'>{generaldonation.Delivery.data[0]}</div>
                        <div className='benfText'>{(generaldonation.D_Date).slice(0,10)}</div>

                    </div>
                ))}
            </div>
        </div>



        <div id='teamData'>
            <div id='tableHead'>
            
                <div className='benfText'>Quantity</div>
                <div className='benfText'>Type</div>
                <div className='benfText'>Quality</div>
                <div className='benfText'>Size</div>
                <div className='benfText'>Delivery</div>
                <div className='benfText buttonAid'>Date</div>
            </div>
            <div id='Participations'>
                {clothes.map((clothes,key) => (
                    <div className='member' key={key}>
                        
                        <div className='benfText'>{clothes.Quantity}</div>
                        <div className='benfText'>{clothes.C_Type}</div>
                        <div className='benfText'>{clothes.Quality}</div>
                        <div className='benfText'>{clothes.Size}</div>
                        <div className='benfText'>{clothes.Delivery.data[0]}</div>
                        <div className='benfText'>{(clothes.D_Date).slice(0,10)}</div>

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
                        <input type="date" id="Date" value={date} onChange={(e) => setdate(e.target.value)}/>
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
                    
                    <label htmlFor='Currency'>Currency</label>
                    <select name="Currency" value={currency} onChange={(e) => setcurrency(e.target.value)}>
                    <option value="" disabled>Select Currency</option>
                        <option value="LE">LE</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
            </>
            }

            {selectD_Type === "Clothes" &&(
            <>
                <div>
                    <div>
                        <label htmlFor='Capacity'>Quantity</label>
                        <input type="text" id="Capacity" value={capacity} onChange={(e) => setcapacity(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='Date'>Date</label>
                        <input type="date" id="Date" value={date} onChange={(e) => setdate(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='Delivery'>Delivery</label>  
                        <input type="text" id="Delivery" value={delivery} onChange={(e) => setdelivery(e.target.value)}/>
                    </div>
                   
                    <div>
                   
                   <label htmlFor='Type'>Type</label>
                   <select name="Type" value={type} onChange={(e) => settype(e.target.value)}>
                   <option value="" disabled>Select Type</option>
                       <option value="Men">Men</option>
                       <option value="Women">Women</option>
                       <option value="Children">Children</option>
                   </select>
               </div>
                </div>
                <div>
                <div>
                    <label htmlFor='Quality'>Quality</label>
                   <select name="Quality" value={quality} onChange={(e) => setquality(e.target.value)}>
                   <option value="" disabled>Select Quality</option>
                       <option value="Good">Good</option>
                       <option value="Very Good">Very Good</option>
                       <option value="Excellent">Excellent</option>
                   </select>
               </div>
               <div>
                    <label htmlFor='Size'>Size</label>
                   <select name="Size" value={size} onChange={(e) => setsize(e.target.value)}>
                   <option value="" disabled>Select Size</option>
                        <option value="XSmall">XSmall</option>
                       <option value="Small">Small</option>
                       <option value="Medium">Medium</option>
                       <option value="Large">Large</option>
                       <option value="XLarge">XLarge</option>
                   </select>
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
                        <input type="date" id="Date" value={date} onChange={(e) => setdate(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='Delivery'>Delivery</label>  
                        <input type="text" id="Delivery" value={delivery} onChange={(e) => setdelivery(e.target.value)}/>
                    </div>
                   
                    <div>
                    <label htmlFor='Descr'>Description</label>
                    <select name="Descr" value={descr} onChange={(e) => setdescr(e.target.value)}>
                    <option value="" disabled>Select Description</option>
                        <option value="books">Books</option>
                        <option value="food">Food</option>
                        <option value="toys">Toys</option>
                        <option value="shoes">Shoes</option>
                        <option value="blankets">Blankets</option>
                    </select>
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