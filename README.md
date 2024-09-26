CloudNote:

CloudNote is a secure, user-friendly note-taking application built using the MERN stack (MongoDB, Express, React, Node.js). It provides a sleek and responsive user experience, enabling users to safely store, manage, and access their notes from anywhere.

Features:

User Authentication:
Secure authentication using JWT and bcrypt with salted password hashing.
Data Storage: 
Notes and user data are stored using MongoDB Atlas, a cloud-based database solution.
Responsive UI: 
Built with Tailwind CSS for a modern, sleek, and responsive design.
State Management: 
Uses React’s Context API for efficient state management across components.
API Integration: 
Backend API handles operations such as note creation, deletion, and authentication.
CORS Configured: 
Secure cross-origin resource sharing (CORS) is configured for safe communication between the frontend and backend.
Tech Stack

Frontend: React, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: JWT, bcrypt

State Management: Context API

Hosting: Render

Live Demo

Check out the live app on Render: [CloudNote](https://cloud-note-frontend.onrender.com/login)

Installation

To run this project locally (which contains both the frontend and backend in a single repo), follow these steps:

Clone the repository:


sh
Copy code

git clone https://github.com/ahmadali3009/cloud-app-note
Navigate to the project directory:


sh
Copy code

cd cloudnote
Install dependencies for both the backend and frontend:


npm install
cd client
npm install
cd ..
Create a .env file in the root directory and add the following environment variables:



MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
Start the backend server:


npm run server
Start the frontend:


cd client
npm start
Note: Both the backend and frontend are integrated into a single repository. The backend runs from the root, while the frontend is in the client/ folder.

Usage
Once the app is running, you can:

Register and log in securely.

Create, view, edit, and delete notes.

All your data is stored in the cloud (MongoDB Atlas) and can be accessed from anywhere.

Contributing

Feel free to fork the repository and submit pull requests. All contributions are welcome!
