
import './Navbar_H.css'


function Navbar_V(props) {

    return (
      <header id='navbar'>
          <p className='navIcon' onClick={()=>props.select(0)}>Participation</p>
          <p className='navIcon' onClick={()=>props.select(1)}>Events</p>
          <p className='navIcon' onClick={()=>props.select(2)}>Account</p>
      </header>
    )

  }
  
  export default Navbar_V