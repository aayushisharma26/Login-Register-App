// import React,{useState} from "react"
// import "./register.css"
// import axios from "axios"

// const Register =()=>{
//     const [user,setUser]=useState({
//         name:"",
//         email:"",
//         password:"",
//         reEnterPassword: ""
//     })
//     const handleChange = e => {
//         const {name,value} = e.target
//         setUser({
//             ...user,
//             [name]:value

//         })
//     }
//     const register =() =>{
//         const {name,email,password,reEnterPassword}=user
//         if (name && email && password &&(password===reEnterPassword)){
            
//             axios.post("http://localhost:9003/register",user)
//             .then(res=>console.log(res))
//         }else{
//             alert("invalid")
//         }

        
        
//     }
//     return (
//         <div className="register">
//             {console.log("User",user)}
//             <h1>Register</h1>
//             <input type="text"  name="name"  value={user.name} placeholder="ENter Name" onChange={ handleChange }></input>
//             <input type="text" name="email" value={user.email} placeholder="ENter Email" onChange={ handleChange }></input>
//             <input type="password" name="password" value={user.password} placeholder="Enter password" onChange={ handleChange }></input>
//             <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Enter re-password" onChange={ handleChange }></input>

//             <div className="button" onClick={register}>Register</div>
//             <div>or</div>
//             <div className="button">Login</div>
//         </div>
//     )
// }
// export default Register;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios.post("http://localhost:9003/register", user)
        .then(res => {
          console.log(res);
          navigate("/login"); // Navigate to login after successful registration
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      alert("Invalid input");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input type="text" name="name" value={user.name} placeholder="Enter Name" onChange={handleChange} />
      <input type="text" name="email" value={user.email} placeholder="Enter Email" onChange={handleChange} />
      <input type="password" name="password" value={user.password} placeholder="Enter Password" onChange={handleChange} />
      <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange} />

      <div className="button" onClick={register}>Register</div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/login")}>Login</div>
    </div>
  );
};

export default Register;
