# Blog App

A simple full-stack blog application built with React, TypeScript, Express, Node.js, MongoDB, Redux Toolkit, and Tailwind CSS.

WORK IN PROGRESS
Deployed on free render free service: server spins after 30+s 
site: https://mern-blog-app-39y0.onrender.com

// test account which can be used to login straight.
email: {test@test.com}
password: Test+User123


## Features
- **User Authentication:** Secure registration and login using JSON Web Tokens.
- **Blog Operations:** Write, like, and comment on blogs.
- **Responsive Design:** User-friendly interface with Tailwind CSS.



## Getting Started

1. **Clone the repository:**

   git clone https://github.com/KedarKandel/Blog.git
   cd blog-app


Install Dependencies:
cd client && npm install
cd ../server && npm install
Set up Environment Variables:

Create a .env file in the server folder with configuration (e.g., PORT, MONGODB_URI, JWT_SECRET).
Start the Application:


# Start the server
cd server && npm run dev

# Start the client
cd ../client && npm run dev
Access the App:
Open your browser and navigate to http://localhost:3000.

Technologies Used
Frontend: React, TypeScript, Redux Toolkit, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JSON Web Tokens (JWT), Bcrypt for password hashing


Usage
Sign Up:
Register with a unique username and a secure password.

Log In:
Enter your credentials to log in securely.
Write a Blog:

Click on "Write a Blog" to create and publish your blogs.
Like and Comment:

Interact with other blogs by liking and commenting.
API Endpoints
GET /api/blogs: Get all blogs
POST /api/blogs: Create a new blog
GET /api/blogs/:blogId: Get a specific blog
PUT /api/blogs/:blogId: Update a blog
DELETE /api/blogs/:blogId: Delete a blog
...
Dependencies
Express, Mongoose, React, Redux Toolkit, Tailwind CSS




