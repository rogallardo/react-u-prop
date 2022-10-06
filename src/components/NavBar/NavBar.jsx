//@ts-check
import React from 'react'

import './NavBar.css'
import { Link } from 'react-router-dom'


export default function NavBar() {

	
  return (
    <div className="navbar-container">
    	<div ><Link className='brand-container' to={"/"}>U-prop</Link></div>
    	<div className='menu-container'>
		</div>
	
  </div>
  
  
  )
}