import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NoteState from './context/notestatecontext';
import App from './App.jsx';
import './index.css';
import Home from './components/home';
import About from './components/About';
import Login from './components/Login.jsx';
import Signup from './components/signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <><App /><Home /></>
  },
  {
    path: "/about",
    element: <><App /><About /></>
  },
  {
    path: "/login",
    element: <><App /><Login /></>
  },
  {
    path: "/signup",
    element: <><App /><Signup /></>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <NoteState>
    <RouterProvider router={router} />
  </NoteState>
);
