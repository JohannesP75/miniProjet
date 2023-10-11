// Modules
const express = require('express');
const app = express();
var mysql = require('mysql');
var cors = require('cors')
const bodyParser = require('body-parser');

// Constants
const PORT_MINIPROJECT=3000;

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

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT_MINIPROJECT, ()=>{
    console.log(`Application started and Listening on port ${PORT_MINIPROJECT}.`);
});

//  GET
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get('/tasks', function(req, res){
    res.send(listTasks);
});

app.get('/tasks/undone', function(req, res){
    let S=[];

    listTasks.forEach((task)=>{
        if(!task["isDone"])S.push(task);
    });

    res.send(S);
});

//  POST
app.post('/new_task', function (req, res) {
    console.log(`Got body : ${req.body}`);
    MAX_ID++;
    let newTask=req.body;
    newTask["id"]=MAX_ID;
    listTasks.push(req.body);
    
    res.sendStatus(200);
});

// DELETE
app.delete('/delete_task/:id', function (req, res) {
    listTasks.delete();
    
    res.sendStatus(200);
});