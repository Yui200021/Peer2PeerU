import React, { useState } from 'react'
import './Register.css'
const Register = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [universityId, setUniversityId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();

    if (email !== confirmEmail){
      alert("Email do not match")
      return;_
    }
    if (password !== confirmPassword){
      alert("Password do not match")
      return;_
    }
    if (!email || !universityId || !password) {
      alert("Please fill all fields!");
      return;
    }
    console.log("All data valid!");
    console.log({ email, universityId, password });
  }

  return (
    <>
      <div className='register-container'>
        <div className='register-image-section'>
          <div className='logo'>
          <img src="/Peer2Peer2.png" alt="logo" className="logo-img" />
          </div>
        <img src="/coverweb.png" alt="Buy and Sell" className="login-image" />
        </div>

          <div className='register-card'>
            <h1 className='register-heading'>Register</h1>
            <form className='register-form' onSubmit={handleSubmit}>

              <label htmlFor="email" className='register-label'>
                Email Address
              </label>
              <input 
              type="email"
              id= "email"
              className='register-input'
              placeholder='Enter you university email'
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
               />

              <label htmlFor="confirmEmail" className='register-label'>
                Confirm Email Address
              </label>
              <input 
              type="email"
              id= "confirmEmail"
              className='register-input'
              placeholder='Enter you university email again'
              value={confirmEmail}
              onChange={(e)=> setConfirmEmail(e.target.value)}
               />

              <label htmlFor="schoolid" className='register-label'>
                Enter your University id number
              </label>
              <input 
                  type="text"
                  id= "universityId"
                  className='register-input'
                  placeholder='Enter you university id number'
                  value={universityId}
                  onChange={(e)=> setUniversityId(e.target.value)}
               />

               <label htmlFor="password" className='register-label'>
                Enter Password
              </label>
              <input 
                  type="password"
                  id= "password"
                  className='register-input'
                  placeholder='Enter your passoword'
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
               />

                <label htmlFor="confirmPassword" className='register-label'>
               Confirm Password
              </label>
              <input 
                  type="password"
                  id= "confirmPassword"
                  className='register-input'
                  placeholder='Enter your passoword again'
                  value={confirmPassword}
                  onChange={(e)=> setConfirmPassword(e.target.value)}
               />
               <button type= "submit" className='register-button'>
                  Register
               </button>
            </form>
            
            
        </div>
      
      </div>
    </>
  )
}

export default Register
