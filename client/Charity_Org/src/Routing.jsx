import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useEffect, useState } from 'react'

import Signin from './Signin.jsx'
import Register from './Register.jsx'
import Leader from './Leader/Leader.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import './main.css'

function Routing() {

    const [view,setView] = useState('leader')

return(
    <>
        <Router>
            <Routes>
                <Route path='/' element={<Signin view={setView}/>}/>
                <Route path='/Register' element={<Register/>}/>
                <Route element={<PrivateRoute viewSet="leader" view={view}/>}>
                    <Route path='/Leader' element={<Leader view={setView}/>} exact/>
                </Route>
            </Routes>
        </Router>
    </>
)}

export default Routing
