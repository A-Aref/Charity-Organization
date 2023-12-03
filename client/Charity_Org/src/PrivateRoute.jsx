
import {Outlet,Navigate} from 'react-router-dom'

function PrivateRoute (props) {
  return (
    props.viewSet === props.view ? <Outlet/> : <Navigate to='/'/>
  )
}

export default PrivateRoute