
import './Navbar_H.css'


function Navbar_H(props) {

    return (
      <header id='navbar'>
          <p className='navIcon' onClick={()=>props.select(0)}>Team</p>
          <p className='navIcon' onClick={()=>props.select(1)}>Aid</p>
          <p className='navIcon' onClick={()=>props.select(2)}>Events</p>
          <p className='navIcon' onClick={()=>props.select(3)}>Account</p>
      </header>
    )

  }
  
  export default Navbar_H