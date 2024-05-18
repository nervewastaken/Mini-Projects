require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken package
const cors = require('cors');
const pool = require('./database');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;


app.use(bodyParser.json());


const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).send('Invalid Token');
    }
};


// Routes

app.post('/users', async (req, res) => {
    try {
       
        if (req.body.password.length > 12) {
            return res.status(400).send('Password length exceeds the limit');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
       
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [req.body.name, hashedPassword]);
        
        res.status(201).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

app.post('/users/login', async (req, res) => {
    try {
        
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [req.body.name]);
        const user = result.rows[0];
        
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
           
            const token = jwt.sign({ user: { username: user.username } }, JWT_SECRET);
            res.json({ token });
        } else {
            res.status(401).send('Invalid password');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});


// Get blogs except those created by the logged-in user
app.get('/blogs', verifyToken, async (req, res) => {
    try {
     
        const username = req.body.username;

      
        const result = await pool.query('SELECT * FROM posts');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


app.get('/blogs/:postId', verifyToken, async (req, res) => {
    try {
      
        const postId = req.params.postId;
   
        const result = await pool.query('SELECT * FROM posts WHERE srno = $1', [postId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


app.post('/my-blogs', verifyToken, async (req, res) => {
    try {
       
        const username = req.body.username;

      
        const result = await pool.query('SELECT * FROM posts WHERE auth_name = $1', [username]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create a new blog
app.post('/blogs',verifyToken, async (req, res) => {
    const { title, content, username } = req.body;
    try {
       
        await pool.query('INSERT INTO posts (title, content, auth_name) VALUES ($1, $2, $3)', [title, content, username]);
        res.status(201).send('Blog created successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete a blog
app.delete('/blogs/:id', verifyToken, async (req, res) => {
    const blogId = req.params.id; 
    
    try {
      
        await pool.query('DELETE FROM posts WHERE srno = $1', [blogId]);
        res.send('Blog deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// Update a blog
app.put('/blogs/:id', async (req, res) => {
    const blogId = req.params.id;
    const { title, content } = req.body;
    try {
       
        await pool.query('UPDATE posts SET title = $1, content = $2 WHERE srno = $3', [title, content, blogId]);
        res.send('Blog updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create a new comment
app.post('/comments', verifyToken, async (req, res) => {
    const { postId, content, username } = req.body;
    try {
      
        await pool.query('INSERT INTO comments (post_id, content, auth_name) VALUES ($1, $2, $3)', [postId, content, username]);
        res.status(201).send('Comment created successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// Get comments for post
app.get('/comments/:postId', async (req, res) => {
    const postId = req.params.postId; 
    console.log(postId)
    try {
        
        const result = await pool.query('SELECT * FROM comments WHERE post_id = $1', [postId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update a comment
app.put('/comments/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    const { content } = req.body.content;
    try {
        
        await pool.query('UPDATE comments SET content = $1 WHERE id = $2', [content, commentId]);
        res.send('Comment updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete a comment
app.delete('/comments/:commentId', async (req, res) => {
    const commentId = req.params.commentId; 
    try {
       
        await pool.query('DELETE FROM comments WHERE id = $1', [commentId]);
        res.send('Comment deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
