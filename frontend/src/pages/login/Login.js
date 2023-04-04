import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from "react-router-dom";


import "./Login.css"

const Login = ({setIsUserLoggedin}) => {
  let navigate =useNavigate();

  //state
  const[user,setUser]=useState({
    email:'',
    password:""
  })

  // handle change function
  const handleChange = e =>{
    const {name,value} = e.target;  
    setUser({...user,[name]:value})
  }

  // user login fuction
  const login = (user)=>{
    user.email&&user.password?
    axios.post("http://localhost:3009/user/login",user).then(res=>{
      if(res.status===201){
        alert(res.data.message);
        localStorage.setItem("blogUser",JSON.stringify(res.data.user))
        setIsUserLoggedin(JSON.parse(localStorage.getItem("fbUser")?true:false))
        navigate("../", { replace: true })
      }else{
        alert(res.data.err);
      }
    }):alert("Fill all the fields of the form to register")
  }

  return (
      <div className="login p-4">
        <header className="d-flex justify-content-center p-3">
          <h1 className="title p-2">Lorem</h1>
        </header>
        <main className="d-flex  justify-content-center text-center">
          <div className="col col-lg-4 all-side-shadow d-flex justify-content-center">
            <div className="login-form container p-3">
              <h3 className="heading-new-account">Sign in to Lorem</h3>
              <hr />
              <input
                name="email"
                onChange={handleChange}
                type="email"
                className="form-control my-3"
                placeholder="Email address"
              />
              <input
                name="password"
                onChange={handleChange}
                type="password"
                className="form-control my-3"
                placeholder=" New Password"
              />
              <div className="new-account btn login-btn new-account-button d-grid gap-2 mt-2 col-6 mx-auto" onClick={()=>{login(user)}}>
                  Log in
              </div>
              <hr />
              <div className="new-account  d-grid gap-2 col-6  mx-auto justify-content-center pb-3">
                <Link to="/signup" className="anchor">
                  <span>Don't have an account? Signup</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
  )
}

export default Login
