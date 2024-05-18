const express = require("express");
const cors = require("cors"); 
const pool = require("./database");
const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.get("/log", async(req,res) => {
    try{
        const loging = await pool.query("SELECT * from logs");
        res.json(loging.rows)
        console.log(req.params)
    } catch(err){
        console.log(err);
    }
})

app.listen(port, () => console.log("server on localhost:4000"))