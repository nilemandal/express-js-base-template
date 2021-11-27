const express = require('express');
const app = express();
const port = 3000;

app.get('/' , (req,res)=>{
    console.log('Hello Nile');
    res.send('Hello world');
})

app.listen(port , ()=>{
    console.log(`App is running at http://localhost:${port}`)
})