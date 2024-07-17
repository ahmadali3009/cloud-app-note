import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    // const host = "http://localhost:5000";
    const host = "https://cloud-notes-glns.onrender.com";
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${host}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const json = await response.json();
            if (json.result) {
                localStorage.setItem("token", json["auth-token"]);
                console.log(localStorage.getItem("token"));
                navigate("/", { state: { key: "value" } });
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error logging in. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={submitHandler} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                    type="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                    autoComplete="current-email"
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
        <div className="text-center mt-4">
            <p className="text-sm text-gray-600">Don't have an account? <Link href="/signup" className="text-indigo-600 hover:underline">Sign Up</Link></p>
        </div>
    </div>
    
    );
};

export default Login;
