const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.static(__dirname));

app.use(bodyParser.json()); 


var tasks = [];


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'index.html'))
});

app.get('/api/tasks', function (req, res) {

    console.log("GET tasks");

    fs.readFile('./app/tasks.json', function read(err, data){
        if(err){
            throw err;
        }
        tasks = data
    });
    res.send(tasks);

});

// POST endpoint for creating a new task
app.post('/api/task', function (req, res) {

    console.log("POST task: " + req.body.name);
    
    tasks = JSON.parse(tasks);
    let id = 1;
    if (tasks.length > 0) {
        let maximum = Math.max.apply(Math, tasks.map(function (f) { return f.id; }));
        id = maximum + 1;
    }

    let new_task = {"id": id, "name": req.body.name, "date": req.body.date, "assignee": req.body.assignee};
    console.log('new task:'+JSON.stringify(new_task,null,2));
    tasks.push(new_task);

    fs.writeFile('./app/tasks.json', JSON.stringify(tasks,null,2) , (err) => {  
        if (err) throw err;
        console.log('task saved!');
    });

    res.send(new_task);

});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// HTTP listener
app.listen(3000, function () {
    console.log('Example listening on port 3000!');
});
module.exports = app;
