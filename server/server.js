const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const Actions = require('./Models/actionsModel');
const path = require('path');
const Messages = require('./Models/messagesModel');
const rateLimit = require("express-rate-limit");
const notAllowed = require('./middlewares/notAllowed');

//middlewares_______________
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
    max: 5
})
app.use(limiter);
//________________________

app.get('/api',notAllowed, (req, res) => {
    res.send('hello world');
})


app.post('/roll',async (req,res) => {
    //rolling the cube
    let data = {};
    const cube = [1, 2, 3, 4, 5, 6];
    data.cube = cube;
    const cubeResult = Math.floor(Math.random() * cube.length + 1);
    
    //validate cube
    if(!cubeResult || cubeResult > 6 || cubeResult < 1) return res.status(406).send('cube was crashed');
    data.cubeNumber = cubeResult;


    
    /*going through all the options that can come out from the cube, and add to the data that will send to the client*/
    if(cubeResult === 1) {
        data.message = 'you stayed in the same place! you Lost :\'(';
        data.action = `rolled 1 and lost cause stay in place`;
    }
    else if(cubeResult === 2) {
        Math.random() < 0.5 ? data.message = 'Alcohol: The alcohol was posioned! you lost!' : data.message = 'Alcohol: The alcohol gave you power to rich to the chest! You Won!'
        data.action = `rolled 2 and ${data.message}`; 
    }
    else if(cubeResult === 3) {
        data.message = 'NOO!! you lost because the dragon ate you!'
        data.action = `player rolled 3 and lost by the dragon`;
     }
    else if (cubeResult === 4) {
         data.message = 'OH MY GOD! you found the chest! you won!';
         data.action = `rolled 4 found the chest`;
     }
    else if(cubeResult === 5) { 
        const messages = await Messages.find().select('message -_id');
        const randMessage = Math.floor(Math.random() * messages.length);

        data.message = `message from a bottle: ${messages[randMessage].message}`;
        data.action = `rolled 5 and get message: ${data.message}`;
    }
    else if (cubeResult === 6) { 
        data.message = 'You went through all the traps and survived! You Won!'
        data.action = `rolled 6 and Won`;
    }

    //create the action that the client just did and write it to the db
    const action = await new Actions({
        date: Date.now(),
        action: `${data.action}`,
        IP: `${req.socket.remoteAddress}`
    })
    //validate
    if(!action) return res.status(400).send('could not create action schema');
    //save it in db if successfully validate
    await action.save();
    //send data to client
    res.status(200).send(data);
});

/* here you can create messages for the bottle messages, I put a middleware to cancle any request,  
   because most likely I should do it manually! BUT, if you wish to use it with postman to make your life easier
   just delete the middleware (notAllowed) and start create messages!
*/
app.post('/create-messages',notAllowed, async (req, res) => {
    const message = await new Messages({
        message: req.body.message
    });
    
    if(!message) return res.sendStatus(400);
    
    message.save();
    res.status(201).send({message});
});

//make sure app will always run even if there was err
process.on('uncaughtException', err => {
    console.error(err);
    console.log("still alive");
});

//start the app
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`connected on port ${port}`));