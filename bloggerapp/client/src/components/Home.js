import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch all blogs
  useEffect(() => {
    fetch('http://localhost:4000/blogs', {
      headers: { 'Authorization': token }
    })
    .then(res => res.json())
    .then(data => setBlogs(data))
    .catch(err => console.error(err));
  }, []);

  const savePostId = (postId) => {
    localStorage.setItem('postId', postId);
    window.location.href = "/Comments";
  };

  return (
    <div>
      <Navbar/>
      <div className="card-container">
        {blogs.map(blog => (
          <div className="card" key={blog.id}>
            <h3>{blog.title}</h3>
            <p>Author: {blog.auth_name}</p>
            <p>{blog.content}</p>
            <button onClick={() => savePostId(blog.srno)}>Comments</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;