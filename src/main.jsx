import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import NoteState from './context/notestatecontext'

import App from './App.jsx'
import './index.css'
import Home from './components/home'
import About from './components/About'
import Login from './components/Login.jsx';
import Signup from './components/signup.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <><App /><Home /></>
  },
  {
    path: "/about",
    element:  <><App/><About /></>
  },
  {
    path: "/login",
    element:  <><App/><Login /></>
  },
  {
    path: "/signup",
    element:  <><App/><Signup /></>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    {/* <App /> */}
    <NoteState>
    <RouterProvider router={router} />
    </NoteState>

  </React.StrictMode>,
)
