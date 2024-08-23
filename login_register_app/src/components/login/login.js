// import React,{useState} from "react"
// import  axios from "axios" 
// import "./login.css"

// const Login =()=>{
//     const [user,setUser]=useState({
        
//         email:"",
//         password:"",
//     })
//     const handleChange = e => {
//         const {name,value} = e.target
//         setUser({
//             ...user,
//             [name]:value

//         })
//     }
//     const login = ()=>{
//         axios.post("http://localhost:9003/login",user)
//         .then(res=>alert(res.data.message))
//     }
    
//     return (
//         <div className="login">
//             {console.log(user)}
//             <h1>login</h1>
//             <input type="text" name="email"  value={user.email} placeholder="ENter Email" onChange={ handleChange }></input>
//             <input type="password"  name="password"  value={user.password} placeholder="Enter password" onChange={ handleChange }></input>
//             <div className="button" onClick={login}>Login</div>
//             <div>or</div>
//             <div className="button">Registration</div>
//         </div>
        
//     )
// }
// export default Login;











import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const login = () => {
    axios.post("http://localhost:9003/login", user)
      .then(res => {
        alert(res.data.message);
        if (res.data.message === "Login Successful") {
          navigate("/homepage"); // Navigate to homepage after successful login
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input type="text" name="email" value={user.email} placeholder="Enter Email" onChange={handleChange} />
      <input type="password" name="password" value={user.password} placeholder="Enter Password" onChange={handleChange} />
      <div className="button" onClick={login}>Login</div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/")}>Register</div>
    </div>
  );
};

export default Login;
