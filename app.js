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

app.set('view engine', 'pug')
app.get('/' , logger, (req,res)=>{
    res.render('index', { title: 'Express Js', message: 'Hello there! Welcome to Relinns Technology' })
})

app.get('/get-request', (req,res)=>{
    console.log('GET Request');
    res.send(`GET Request for ${req.query.name} at ${new Date()}`);
})

app.post('/post-request', (req,res)=>{
    console.log('POST Request' , req.body);
    res.send(`POST Response for ${req.body?.name} at ${new Date()}`)
})

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: "test_db",
    port:8889
  });

connection.connect(error => {
    if (error){
        console.log("An error occurred");
        throw error;
    }

    app.listen(port, ()=>{
        console.log("Application listening at http://localhost:"+port);
    })
});

var MongoClient = require('mongodb').MongoClient
var db;
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if (err) throw err
  db = client.db('test_db')
})

app.get('/get-db-data-mongo', async (req,res)=>{
    db.collection('test_collection').find().toArray(function (err, result) {
        if (err) throw err;
        return res.send({status:'success',data:result });
    })
})

app.get('/get-db-data-mysql' , async (req,res)=>{
    connection.query('SELECT * FROM test_table', (err, rows, fields)=>{
        if (err) throw err

        if(rows[0]) return res.send({status:'success', data: rows})
        else return res.send({status:'error'});
    })
});

