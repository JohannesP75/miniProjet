// Modules
const express = require('express');
const app = express();
var mysql = require('mysql');
var cors = require('cors')

// Constants
const PORT_MINIPROJECT=3000;

let listTasks=[
    {
        name: "alpha",
        dueDate: "2023-12-25",
        isDone: false
    },
    {
        name: "beta",
        dueDate: "2022-12-19",
        isDone: false
    },
    {
        name: "gamma",
        dueDate: "2023-07-14",
        isDone: true
    },
    {
        name: "delta",
        dueDate: "2020-01-04",
        isDone: false
    },
    {
        name: "epsilon",
        dueDate: "2021-05-17",
        isDone: true
    }
];

// Calls
app.use(cors())

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

app.listen(PORT_MINIPROJECT, ()=>{
    console.log(`Application started and Listening on port ${PORT_MINIPROJECT}.`);
});