import React, { useState, useEffect } from 'react';
import './updatecomment.css'
import Navbar from './navbar';

const Ucomment = () => {
  const [updatedContent, setUpdatedContent] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentId = localStorage.getItem('comId');
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:4000/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ content: updatedContent })
      });

      if (response.ok) {
        console.log('Comment updated successfully');
       
      } else {
        console.error('Failed to update comment');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <div>
        <Navbar/>
      <div className="ucomment-container">
      <h2 className="ucomment-heading">Update Comment</h2>
      <form onSubmit={handleSubmit} className="ucomment-form">
        <div>
          <label htmlFor="updatedContent" className="ucomment-label">Updated Content:</label>
          <textarea
            id="updatedContent"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            required
            className="ucomment-textarea"
          />
        </div>
        <button type="submit" className="ucomment-button">Update Comment</button>
      </form>
    </div>
    </div>
  );
};

export default Ucomment;
