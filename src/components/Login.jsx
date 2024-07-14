import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Login = () => {
    const host = "http://localhost:5000";
    const [credentials , setcredentials] = useState({email:"" ,password:""})
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const navigate = useNavigate();
    const submithandler = async(e)=>
        {
            e.preventDefault()
            const response = await fetch(`${host}/login`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({email: credentials.email , password: credentials.password}), // body data type must match "Content-Type" header
              });
              const json = await response.json();    
            //    console.log(json)
               if(json.result){
                localStorage.setItem("token" , json["auth-token"])
                console.log(localStorage.getItem("token"))
                navigate("/", { state: { key: "value" } });
            }
            else{
                alert("there is no token")
            }
        }
    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <form onSubmit={submithandler} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <input
                        type="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="email"
                        value={credentials.email}
                        onChange={onChange}
                        autoComplete="current-email"
                        name="email"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                        autoComplete="current-password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-indigo-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Login
