
import './Navbar_H.css'


function Navbar_H(props) {

    return (
      <header id='navbar'>
          <p className='navIcon' onClick={()=>props.select(0)}>Home</p>
          <p className='navIcon' onClick={()=>props.select(1)}>Team</p>
          <p className='navIcon' onClick={()=>props.select(2)}>Aid</p>
          <p className='navIcon' onClick={()=>props.select(3)}>Events</p>
          <p className='navIcon' onClick={()=>props.select(5)}>Account</p>
      </header>
    )

  }
  
  export default Navbar_H