const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const Actions = require('./Models/actionsModel');

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());



app.get('/', (req, res) => {
    alert('Hello')
    res.send('hello world');
})


app.post('/roll',async (req,res) => {
    const cube = [1, 2, 3, 4, 5, 6];

    const cubeResult = Math.floor(Math.random() * cube.length);
    
    
    

});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`connected on port ${port}`));