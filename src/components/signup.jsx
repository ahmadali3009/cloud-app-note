import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const host = "https://cloud-notes-glns.onrender.com";
    // const host = "http://localhost:5000";

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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={submitHandler}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div className="mb-4">
                        <label htmlFor="namee" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="namee"
                            id="namee"
                            autoComplete="current-name"
                            value={credentials.namee}
                            onChange={onChange}
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="current-email"
                            value={credentials.email}
                            onChange={onChange}
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="current-password"
                            value={credentials.password}
                            onChange={onChange}
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Signup
