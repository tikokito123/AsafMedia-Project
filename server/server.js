const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const Actions = require('./Models/actionsModel');
const path = require('path');
const process = require('process');
const rateLimit = require("express-rate-limit");

//middlewares
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: false}));

//load build
const build = path.join(__dirname, "..","client", "build");
//const public = path.join(__dirname, "..","client", "public");
console.log(process.env.NODE_ENV);
//app.use(express.static(public)); 
app.use(express.static(build));
//allow user to request only one request every one second!
const limiter = rateLimit({
    windowMs: 1000,
    max: 1
})
app.use(limiter);

app.get('/api', (req, res) => {
    res.send('hello world');
})


app.post('/roll',async (req,res) => {
    //rolling the cube
    const cube = [1, 2, 3, 4, 5, 6];
    const cubeResult = Math.floor(Math.random() * cube.length + 1);
    //validate cube
    console.log(cubeResult);
    if(!cubeResult || cubeResult > 6 || cubeResult < 1) return res.status(406).send('cube was crashed');
    //create the action that the client just did and write it to the db
    const action = await new Actions({
        date: Date.now(),
        action: `player rolled the cube ${cubeResult}`,
        IP: `${req.socket.remoteAddress}`
    })
    //validate
    if(!action) return res.status(400).send('could not create action schema');
    //save it in db if successfully validate
    await action.save();
   
    //send data to client
    res.status(200).json({
        cubeNumber: cubeResult,
        action
    })
});

//make sure app will always run even if there was err
process.on('uncaughtException', err => {
    console.error(err);
    console.log("still alive");
});

//start the app
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`connected on port ${port}`));