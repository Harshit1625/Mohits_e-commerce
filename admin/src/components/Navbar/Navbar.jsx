import React from 'react'
import './Navbar.css'
import logo from '../../Assets/nav-logo.svg'
import profile_icon from '../../Assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='nav-logo' src={logo} alt="" />
      <img className='nav-profile' src={profile_icon} alt="" />
    </div>
  )
}

export default Navbar
