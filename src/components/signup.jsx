import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const host = "https://cloud-notes-glns.onrender.com";

    const [credentials , setcredentials] = useState({namee : "", email : "", password : "" })
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const navigate = useNavigate();

    const submithandler = async(e)=>
        {
            e.preventDefault()
            const response = await fetch(`${host}/signup`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({name: credentials.namee , email: credentials.email , password: credentials.password}), // body data type must match "Content-Type" header
              });
              const json = await response.json();    
               if(json.result){
                localStorage.setItem("token" , json["auth-token"])
                navigate("/login", { state: { key: "value" } });
            }
        }
    return (
        <div>
            <form onSubmit={submithandler}>
                <div class="mb-3">
                    <label for="namee" class="form-label">Name</label>
                    <input type="namee" class="form-control" id="namee" value={credentials.namee} onChange={onChange} autocomplete="current-name" name='namee'  />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" value={credentials.email} onChange={onChange} autocomplete="current-email" name='email' aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name='password' value={credentials.password} onChange={onChange} autocomplete="current-password" />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>    
        </div>
    )
}

export default Signup
