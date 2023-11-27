
import { useEffect, useState } from 'react'
import "./Team.css"

function Team() {

    const [members,setMembers] = useState([{key:0,"id": "V_19956", "name": "tofa Ahmad","points":19988,"phone":"01026908100",best:true},{key:1,"id": "V_156", "name": "Salah Mohamed","points":77777,"phone":"01026908200",best:false},{key:2,"id": "H_19956", "name": "tofa Ahmad","points":19988,"phone":"01026908100",best:false}])
    const [points,setPoints] = useState([0,0,0])


    function changePoints (value,Rkey) {
        let temp = points
        temp[Rkey] = value
        setPoints({...temp})

    }

    function AddPoints () {
        if(confirm("Are you sure you want to make this change"))
        {
            let temp = points
            setMembers(members.map((member) => {
                const sumPoints = parseInt(member.points)+parseInt(points[member.key])
                temp[member.key] = 0
                return {
                    ...member,
                    points: sumPoints
                }
            }))
            setPoints({...temp})
        }

    }

    function changeBest (Rkey) {
        if(confirm("Are you sure you want to make this change"))
        {
            setMembers(members.map((member) => {
                return {
                    ...member,
                    best: member.key == Rkey ? true:false
                }
            }))
        } 
    }

    return (
    <div id='teamPage'>
        <h1 id='Title'>Team Members</h1>
        <div id='sort'>
            <button type="button">Sort on Points</button>
        </div>

        <div id='teamData'>
            <div id='tableHead'>
                <div className='teamText'>ID</div>
                <div className='teamText'>Name</div>
                <div className='teamText'>Points</div>
                <div className='teamText'>Phone</div>
                <div className='teamText bestMember'>Best member</div>
            </div>
            <div id='members'>
                {members.map((member) => (
                    <div className='member' key={member.key}>
                        <div className='teamText'>{member.id}</div>
                        <div className='teamText'>{member.name}</div>
                        <div className='teamText Points'>
                            {member.points}
                            <input type="number" className='PointsAdd' min='0' max="500" value={points[member.key]} onChange={(e)=>{changePoints(e.target.value,member.key)}}/>
                        </div>
                        <div className='teamText'>{member.phone}</div>
                        <div className='teamText bestMember'>
                            <input type="radio" className='radioBest' checked={member.best} onChange={() => changeBest(member.key)}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div id='addPoints'>
            <button type="button">Add Volunteer</button>
            <button type="button" onClick={AddPoints}>Add points</button>
        </div>
    </div>

    )
  }
  
  export default Team