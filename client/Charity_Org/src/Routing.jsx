import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useEffect, useState } from 'react'

import Signin from './Signin.jsx'
import Register from './Register.jsx'
import Leader from './Leader/Leader.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import './main.css'

function Routing() {

    const [isSigned,setIsSigned] = useState(false)

    const login = () => setIsSigned(true)
    const logout = () => setIsSigned(false)

return(
    <>
        <Router>
            <Routes>
                <Route path='/' element={<Signin login={login}/>}/>
                <Route path='/Register' element={<Register/>}/>
                <Route element={<PrivateRoute token={isSigned}/>}>
                    <Route path='/Leader' element={<Leader logout={logout}/>} exact/>
                </Route>
            </Routes>
        </Router>
    </>
)}

export default Routing
