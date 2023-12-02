import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import ReactDOM from 'react-dom/client'
import Signin from './Signin.jsx'
import Register from './Register.jsx'
import Leader from './Leader/Leader.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/Leader' element={<Leader/>} exact/>
        </Route>
      </Routes>
    </Router>
    
  </React.StrictMode>,
)
