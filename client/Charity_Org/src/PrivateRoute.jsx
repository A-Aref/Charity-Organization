
import {Outlet,Navigate} from 'react-router-dom'

function PrivateRoute (props) {
  return (
    props.token ? <Outlet/> : <Navigate to='/'/>
  )
}

export default PrivateRoute