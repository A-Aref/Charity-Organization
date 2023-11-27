import React from 'react'
import ReactDOM from 'react-dom/client'
import Signin from './Signin.jsx'
import Register from './Register.jsx'
import Leader from './Leader/Leader.jsx'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/Leader' element={<Leader/>}/>
        <Route path='/Register' element={<Register/>}/>
      </Routes>
    </Router>
    
  </React.StrictMode>,
)
