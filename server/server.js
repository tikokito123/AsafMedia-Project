const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const Actions = require('./Models/actionsModel');
const rateLimit = require("express-rate-limit");



app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: false}));
//allow user to request only one request every one second!
const limiter = rateLimit({
    windowMs: 1000,
    max: 1
})
app.use(limiter);

app.get('/', (req, res) => {
    res.send('hello world');
})


app.post('/roll',async (req,res) => {
    //create the action that the client just did and write it to the db
    const action = await new Actions({
        date: Date.now(),
        action: req.body.action,
        IP: `${req.socket.remoteAddress}`
    })
    //validate
    if(!action) return res.status(400).send('could not create action schema');
    //save it in db if successfully validate
    await action.save();
    //roll the cube
    const cube = [1, 2, 3, 4, 5, 6];
    const cubeResult = Math.floor(Math.random() * cube.length);
    //validate cube
    if(!cubeResult || cubeResult > 6 || cubeResult < 1) return res.status(406).send('cube was crashed');
    //send data to client
    res.status(200).json({
        cubeNumber: cubeResult,
        action
    })
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`connected on port ${port}`));