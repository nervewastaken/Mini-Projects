import React, { useState, useEffect } from 'react';
import './addcomment.css';
import Navbar from './navbar';

const AddComment = () => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const postId = localStorage.getItem('postId');
  const author = localStorage.getItem('username');

  useEffect(() => {
    const fetchBlogAndComments = async () => {
      try {
        const [blogResponse, commentsResponse] = await Promise.all([
          fetch(`http://localhost:4000/blogs/${postId}`, {
            headers: { 'Authorization': token }
          }),
          fetch(`http://localhost:4000/comments/${postId}`, {
            headers: { 'Authorization': token }
          })
        ]);

        if (!blogResponse.ok) {
          throw new Error('Failed to fetch blog');
        }
        const blogData = await blogResponse.json();
        setBlog(blogData);

        if (!commentsResponse.ok) {
          throw new Error('Failed to fetch comments');
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchBlogAndComments();
  }, [postId, token]);

  const addComment = () => {
    fetch('http://localhost:4000/comments', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ postId, content: newComment, username: author })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add comment');
        }
        setNewComment('');
        return fetch(`http://localhost:4000/comments/${postId}`, {
          headers: { 'Authorization': token }
        });
      })
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(error => console.error(error));
  };

  const deleteComment = (commentId) => {
    fetch(`http://localhost:4000/comments/${commentId}`, {
      method: 'DELETE',
      headers: { 'Authorization': token }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete comment');
        }
        return fetch(`http://localhost:4000/comments/${postId}`, {
          headers: { 'Authorization': token }
        });
      })
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(error => console.error(error));
  };

  const handleUpdate = (commentId) => {
    localStorage.setItem('comId', commentId);
    window.location.href = "/UpdateComment";
  };
  

  if (error) {
    return <div>{error}</div>;
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar/>
    <div className="add-comment-container">
      <div>
        {blog.map(blog => (
          <div key={blog.id}>
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-content">{blog.content}</p>
          </div>
        ))}

        <div className="comment-container">
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <p className="comment-content">{comment.content}</p>
              <p className="comment-author">Comment by: {comment.auth_name}</p>
              {(author === 'pgadmin' || comment.auth_name === author) && (
                <div>
                  <button onClick={() => deleteComment(comment.id)}>Delete</button>
                  <button onClick={() => handleUpdate(comment.id)}>Update</button>

                </div>
              )}
            </div>
          ))}
        </div>

        <input
          type="text"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="comment-input"
        />
        <button onClick={addComment} className="comment-submit">Submit</button>
      </div>
    </div>
    </div>
  );
};

export default AddComment;
