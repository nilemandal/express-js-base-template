const express = require('express');
const app = express();
const port = 3000;

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

const logger = (req,res,next) =>{
    console.log('Request hit at' , new Date());
    next()
}
app.get('/' , logger, (req,res)=>{
    res.send('Hello world');
})

app.get('/get-request', (req,res)=>{
    console.log('GET Request');
    res.send(`GET Request for ${req.query.name} at ${new Date()}`);
})

app.post('/post-request', (req,res)=>{
    console.log('POST Request' , req.body);
    res.send(`POST Response for ${req.body?.name} at ${new Date()}`)
})

app.listen(port , ()=>{
    console.log(`App is running at http://localhost:${port}`)
})