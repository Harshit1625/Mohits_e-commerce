import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png' 
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import nav_dropdown from '../Assets/dropdown_icon.png'

const Navbar = () => {
    const [menu, setmenu] = useState()
    const {gettotalcartItems} = useContext(ShopContext)
    const menuref = useRef()

    const menuhr = (menu) => {
        setmenu(menu)
    }

    const dropdown = (e) => {
      menuref.current.classList.toggle('nav-menu-visible')
      e.target.classList.toggle('open')
    }
    
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown} src={nav_dropdown} alt="" />
      <ul ref={menuref} className="nav-menu">
        <li 
         onClick={(e) => {menuhr("shop")}}>
            <Link to='/' style={{textDecoration: 'none'}}>Shop</Link>
            {menu==="shop"? <hr /> : <></>}
        </li>
        <li
         onClick={(e) => {menuhr("Men")}}>
            <Link to='/men' style={{textDecoration: 'none'}}>Men</Link>
            {menu==="Men"? <hr /> : <></>}
        </li>
        <li
         onClick={(e) => {menuhr("Women")}}>
            <Link to='/women' style={{textDecoration: 'none'}}>Women</Link>
            {menu==="Women"? <hr /> : <></>}
        </li>
        <li
         onClick={(e) => {menuhr("Kids")}}>
            <Link to='/kids' style={{textDecoration: 'none'}}>Kids</Link>
            {menu==="Kids"? <hr /> : <></>}
        </li> 
      </ul>
      <div className="nav-logo-cart">
        {localStorage.getItem('auth-token') ? <button onClick={() => {localStorage.removeItem('auth-token'), window.location.replace('/')}}>Log Out</button> : 
        <Link to='/login' style={{textDecoration: 'none'}}><button>Login</button></Link>}
        <Link to='/cart' style={{textDecoration: 'none'}}><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{gettotalcartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
