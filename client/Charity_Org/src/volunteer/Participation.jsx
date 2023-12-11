
import { useEffect, useState } from 'react'
import "./Participation.css"

function Participation() {

    const [Participations,setParticipations] = useState([{"Volunteer id":"1","Participation Type": "Abd-Allah","Bonus Type":"Ahmad","Bonus Value":"poor","Date":"12/3/2021"},{"id":"2","FirstName": "Ahmad","LastName":"Ahmad","State":"disable","Address":"tagamo3","Date":"4/3/2021"}])
    
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



    useEffect(() => {
        if(populatedB) {
            let temp = Participations
            temp[beneficiaries.length] = {"id":Participations.length+2,"FirstName": fName,"LastName":lName,"State":status,"Address":address,"L_A_Date":date}
            setParticipations(temp)
            setPopUpB(false)

            setAddress('')
            setFName('')
            setStatus('')
            setLName('')
            setPopulatedB(false)
        }
    },[populatedB])


   
    

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




    return (
    <div id='ParticipationsPage'>
        <div>
            <h1 id='Title'>Previous Participations</h1>
        </div>
        <div id='teamData'>
            <div id='tableHead'>
                <div className='benfText idtable'>ID</div>
                <div className='benfText'>Participation Type</div>
                <div className='benfText'>Bonus Type</div>
                <div className='benfText'>Bonus Value</div>
                <div className='benfText buttonAid'>Date</div>
            </div>
            <div id='Participations'>
                {Participations.map((member) => (
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


        

        
       
         <RequestBox />
    </div>
    )
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
              <img src="https://icon-library.com/images/success-icon/success-icon-29.jpg" alt="accepted" />
            ) : (
              <img src="https://icon-library.com/images/rejected-icon/rejected-icon-21.jpg" alt="rejected" />
            )}
            <p>Would you like to participate in an event?</p>
            <button onClick={handleAccept}>Yes</button>
            <button onClick={handleReject}>No</button>
          </div>
        );
      }
      
    }

  export default Participation