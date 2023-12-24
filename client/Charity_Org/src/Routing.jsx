import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useEffect, useState } from 'react'

import Signin from './Signin.jsx'
import Register from './Register.jsx'
import Leader from './Leader/Leader.jsx'
import Volunteer from './volunteer/volunteer.jsx'
import Donor from './Donor/Donor.jsx'
import Admin from './Admin/Admin.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import './main.css'

function Routing() {

    const [view,setView] = useState('none')
    const [user,setUser] = useState({})
    
return(
    <>
        <Router>
            <Routes>
                <Route path='/' element={<Signin view={setView} setUser={setUser}/>}/>
                <Route path='/Register' element={<Register/>}/>
                <Route element={<PrivateRoute viewSet="leader" view={view}/>}>
                    <Route path='/Leader' element={<Leader view={setView} user={user}/>} exact/>
                </Route>
                <Route element={<PrivateRoute viewSet="volunteer" view={view}/>}>
                    <Route path='/Volunteer' element={<Volunteer view={setView} user={user}/>} exact/>
                </Route>
                <Route element={<PrivateRoute viewSet="Donor" view={view}/>}>
                    <Route path='/Donor' element={<Donor view={setView} user={user}/>} exact/>
                </Route>
                <Route element={<PrivateRoute viewSet="Admin" view={view}/>}>
                    <Route path='/Admin' element={<Admin view={setView} user={user}/>} exact/>
                </Route>

            </Routes>
        </Router>
    </>
)}

export default Routing
