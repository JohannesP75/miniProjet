// Modules
const express = require('express');
const app = express();
var mysql = require('mysql');
var cors = require('cors')
const bodyParser = require('body-parser');

// Constants
const PORT_MINIPROJECT=3000;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_miniproject_tasks"
  });

let listTasks=[
    {
        id: 0,
        name: "alpha",
        dueDate: "2023-12-25",
        isDone: false
    },
    {
        id: 1,
        name: "beta",
        dueDate: "2022-12-19",
        isDone: false
    },
    {
        id: 2,
        name: "gamma",
        dueDate: "2023-07-14",
        isDone: true
    },
    {
        id: 3,
        name: "delta",
        dueDate: "2020-01-04",
        isDone: false
    },
    {
        id: 4,
        name: "epsilon",
        dueDate: "2021-05-17",
        isDone: true
    }
];

//  Initialisation
let MAX_ID=Math.max(...listTasks.map((task)=>task["id"]));

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT_MINIPROJECT, ()=>{
    console.log(`Application started and Listening on port ${PORT_MINIPROJECT}.`);
});

//  GET
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get('/tasks/all', function(req, res){
    let sql="SELECT * FROM tasks";

    con.query(sql, function(error, results, fields){
        if (error) throw error;

        res.send(results);
    });
});

app.get('/tasks/undone', function(req, res){
    let sql="SELECT * FROM tasks WHERE isDone=1";

    con.query(sql, function(error, results, fields){
        if (error) throw error;

        res.send(results);
    });
});

//  POST
app.post('/task/new', function (req, res) {
    console.log(`Got body : ${req.body}`);
    let sql="INSERT INTO tasks (name, dueDate, isDone) VALUES (?, ?, ?)";

    con.query(sql, [req.body.name, req.body.dueDate, req.body.isDone], function(error, results, fields){
        if (error) throw err;
        console.log("Number of tasks inserted : " + results.affectedRows);
    });

    res.sendStatus(200);
});

// DELETE
app.delete('/task/delete/:id', function (req, res) {
    var idTask=req.params.id;
    
    let sql="DELETE FROM tasks WHERE id = ?";

    con.query(sql, [idTask], function(error, results, fields){
        if (error) throw error;
        console.log("Number of tasks deleted : " + results.affectedRows);
    });
    
    res.sendStatus(200);
});

// PATCH
app.patch('/task/fulfill/:id', function (req, res) {
    var idTask=req.params.id;

    let sql="UPDATE tasks SET isDone = 1 WHERE id = ?";

    con.query(sql, [idTask], function(error, results, fields){
        if (error) throw error;
        console.log("Number of tasks done : " + results.affectedRows);
    });
    
    res.sendStatus(200);
})

app.patch('/task/edit/:id', function (req, res) {
    var idTask=req.params.id;

    let sql="UPDATE tasks SET name = ?, dueDate = ?, isDone = ?  WHERE id = ?";

    con.query(sql, [req.body.name, req.body.dueDate, req.body.isDone, idTask], function(error, results, fields){
        if (error) throw error;
        console.log("Number of tasks updated : " + results.affectedRows);
    });

    res.sendStatus(200);
})