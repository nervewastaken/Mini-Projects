import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import pkg from 'pg';
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { Pool } = pkg;

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));


app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // Load previous messages from the database
  pool.query('SELECT * FROM messages ORDER BY timestamp ASC', (err, result) => {
    if (err) {
      throw err;
    }
    result.rows.forEach((row) => {
      socket.emit('chat message', row);
    });
  });

  socket.on("chat message", (data) => {
    const { username, message } = data;
    const timestamp = new Date();

    // Save message to the database
    pool.query(
      'INSERT INTO messages (username, message, timestamp) VALUES ($1, $2, $3)',
      [username, message, timestamp],
      (err, res) => {
        if (err) {
          throw err;
        }
      }
    );

    // Emit message to all clients
    io.emit("chat message", { username, message, timestamp });
    console.log('message: ' + username + ": " + message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on PORT:3000");
});
