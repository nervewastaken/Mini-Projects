import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import './updatep.css';

const UpdatePost = () => {
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const updateBlogId = localStorage.getItem('updateBlogId');

    const fetchBlogData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/blogs/${updateBlogId}`, {
          headers: {
            'Authorization': token
          }
        });

        if (response.ok) {
          const data = await response.json();

          setUpdatedTitle(data.title);
          setUpdatedContent(data.content);
        } else {
          console.error('Failed to fetch blog data');
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    try {
      const updateBlogId = localStorage.getItem('updateBlogId');
      const response = await fetch(`http://localhost:4000/blogs/${updateBlogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ title: updatedTitle, content: updatedContent })
      });

      if (response.ok) {
        console.log('Blog updated successfully');
        window.location.href = '/CreateBlog';
      } else {
        console.error('Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="update-post-container">
        <h2 className="update-post-heading">Update Post</h2>
        <form onSubmit={handleSubmit} className="update-post-form">
          <div className="form-group">
            <label htmlFor="updatedTitle">Updated Title:</label>
            <input
              type="text"
              id="updatedTitle"
              value={updatedTitle} // Set value to updatedTitle state
              onChange={(e) => setUpdatedTitle(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="updatedContent">Updated Content:</label>
            <textarea
              id="updatedContent"
              value={updatedContent} // Set value to updatedContent state
              onChange={(e) => setUpdatedContent(e.target.value)}
              required
              className="textarea-field"
            />
          </div>
          <button type="submit" className="submit-button">Update Post</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
