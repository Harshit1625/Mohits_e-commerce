import React, { useState } from 'react'
import './CSS/LoginSign.css' 

const LoginSign = () => {
  const [state, setstate] = useState("Login")
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  
  const login = async () => { 
    const user = {name,email,password}
     
    let responseData
     await fetch("http://localhost:4000/login", {
      method: "POST",
      headers:{
        Accept: 'application/form-data',
        "Content-type": 'application/json'
      },
      body: JSON.stringify(user)
     }).then((resp) => resp.json()).then((data) => responseData = data)
     if(responseData.success){
      localStorage.setItem('auth-token', responseData.token) 
      window.location.replace('/')
     }
  else{
    alert(responseData.error)
  }
  }

  const signUp = async () => { 
    const user = {name,email,password}
     
    let responseData
     await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers:{
        Accept: 'application/form-data',
        "Content-type": 'application/json'
      },
      body: JSON.stringify(user)
     }).then((resp) => resp.json()).then((data) => responseData = data)
     if(responseData.success){
      localStorage.setItem('auth-token', responseData.token) 
      window.location.replace('/')
     }
  else{
    alert(responseData.error)
  }
  }

  return (
    <div className='login'>
      <div className="loginSignContainer">
        <h1>{state}</h1>
        <div className="loginSign-fields">
         {state === "Sign Up" ? <input name='username'value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Your Name'/> : <></>}
          <input name='email' onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email Address'/>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="" placeholder='password'/>
        </div>
          <button onClick={() => {state === "Login" ? login() : signUp()}}>Continue</button>
          {state === "Sign Up"?  <p className="loginSign-login">Already have an account? <span onClick={() => {setstate("Login")}}>Login</span></p>:  <p className="loginSign-login">Create an account? <span onClick={() => {setstate("Sign Up")}}>Sign Up</span></p>}
          <div className="loginsign-agree">
            <input type="checkbox" name='' id=''/>
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
      </div>      
    </div>
  )
}

export default LoginSign
