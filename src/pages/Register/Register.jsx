import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [universityId, setUniversityId] = useState('');
  const [universitystudentId, setUniversitystudentId]= useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const navigate= useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (email !== confirmEmail) {
      alert("Emails do not match");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!email || !universityId || !universitystudentId || !password) {
      alert("Please fill all fields!");
      return;
    }
  
    const payload = {
      email,
      password,
      universityid: universityId,
      universitystudentid: universitystudentId,
      firstname, 
      lastname     
    };
  
    try {
      const res = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      if (res.ok) {
        alert("Registration successful!");
        navigate("/")
      } else {
        const data = await res.json();
        alert(data.detail || "Registration failed");
      }
  
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong");
    }
  };

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
            <label className="register-label" htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              className="register-input"
              placeholder="Enter your first name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />

            <label className="register-label" htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              className="register-input"
              placeholder="Enter your last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />

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
                  placeholder='Enter you university id'
                  value={universityId}
                  onChange={(e)=> setUniversityId(e.target.value)}
               />
               <label htmlFor="universitystudentid" className='register-label'>
                Enter your University id number
              </label>
              <input 
                  type="text"
                  id= "universitystudentid"
                  className='register-input'
                  placeholder='Enter you university student id'
                  value={universitystudentId}
                  onChange={(e)=> setUniversitystudentId(e.target.value)}
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
