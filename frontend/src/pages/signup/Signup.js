import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({setIsUserLoggedin}) => {

  let navigate= useNavigate()
  //state
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  //handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // register user function
  const register = (user)=>{
    user.fullName&&user.email&&user.password?
    axios.post("http://localhost:3009/user/signup",user)
    .then(res=>{
      alert(res.data.message);
      localStorage.setItem("blogUser",JSON.stringify(res.data.user))
      if(res.data.user){
        setIsUserLoggedin(true);
        navigate("../", { replace: true })
      }
    })
    .catch(err=>console.log(err)):alert("Fill all the fields of the form to register")
  }
  return (
      <div className="signup p-4">
        <header className="d-flex justify-content-center p-3">
          <h1 className="title p-2">Lorem</h1>
        </header>
        <main className="d-flex justify-content-center">
          <div className="col col-lg-4 all-side-shadow d-flex justify-content-center">
            <div className="login-form container p-3">
              <h3 className="heading-new-account">Create a new account</h3>
              <p>It's quick and easy.</p>
              <hr />
              <div className="container text-center">
                <div className="row name-input">
                  <input
                    className="col m-1 form-control"
                    name="fullName"
                    onChange={handleChange}
                    placeholder="Full Name"
                    value={user.fullName}
                    type="text"
                  />
                  
                </div>
              </div>
              <input
                name="email"
                onChange={handleChange}
                type="email"
                className="form-control mt-2 mb-2"
                placeholder="Email address"
                value={user.email}
              />
              <input
                name="password"
                onChange={handleChange}
                type="password"
                className="form-control mt-2 mb-2"
                placeholder=" New Password"
                value={user.password}
              />
              <div className="new-account btn signup-btn new-account-button d-grid gap-2 mt-2 col-6 mx-auto" onClick={()=>{register(user)}}>
                  Sign Up
              </div>
              <hr />
              <div className="new-account d-grid gap-2 col-6  mx-auto justify-content-center p-3">
                <Link to="/login" className="anchor">
                  Already have an account?
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
};

export default Signup;    