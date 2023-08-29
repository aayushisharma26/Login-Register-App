import React,{useState} from "react"
import  axios from "axios" 
import "./login.css"

const Login =()=>{
    const [user,setUser]=useState({
        
        email:"",
        password:"",
    })
    const handleChange = e => {
        const {name,value} = e.target
        setUser({
            ...user,
            [name]:value

        })
    }
    const login = ()=>{
        axios.post("http://localhost:9003/login",user)
        .then(res=>alert(res.data.message))
    }
    
    return (
        <div className="login">
            {console.log(user)}
            <h1>login</h1>
            <input type="text" name="email"  value={user.email} placeholder="ENter Email" onChange={ handleChange }></input>
            <input type="password"  name="password"  value={user.password} placeholder="Enter password" onChange={ handleChange }></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button">Registration</div>
        </div>
        
    )
}
export default Login;