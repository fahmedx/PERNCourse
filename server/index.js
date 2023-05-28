const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create

app.post("/todos", async(req,res) =>{
    try{
       const {st_desc} = req.body;
       const newTodo = await pool.query(
            "INSERT INTO todo (ST_DESC) VALUES ($1) RETURNING *", 
            [st_desc]
       );
       res.json(newTodo.rows[0]);
    }catch(err){
        console.error(err.message);
        res.json(err.message);
    }
})

//get all

app.get("/todos", async(req,res)=>{
    try {
        const allTodos = pool.query("SELECT * FROM TODO");
        res.json((await allTodos).rows);
    } catch (err) {
        console.error(err.message)
        res.json(err.message);
    }
})

//get a todo

app.get("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        specificTodo =pool.query("SELECT * FROM TODO WHERE ID_TODO = ($1)", [id]);
        res.json((await specificTodo).rows);
    } catch (err) {
        console.error(err.message)
        res.json(err.message);
    }
})

//update a todo

app.put("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const {st_desc} = req.body;
        pool.query("UPDATE TODO SET ST_DESC = ($1) WHERE ID_TODO = ($2)", [st_desc, id]);
        res.send("To do was updated");
    } catch (err) {
        console.error(err.message)
        res.json(err.message);
    }
})


//delete a todo
app.delete("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        pool.query("DELETE FROM TODO WHERE ID_TODO = ($1)",[id]);
        res.send("Chosen todo do was deleted");
    } catch (err) {
        console.error(err.message)
        res.json(err.message);
    }
})


app.listen(5000, () => {
    console.log("Server started on 5000");
});