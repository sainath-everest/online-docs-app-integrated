const express = require('express');
const routes = require('./routes/router');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
let config = require('config');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DBHOst);
app.use(bodyParser.json());

app.use(cors());
app.use('/api',routes);

app.use(function(err,req,res){
    res.send({error : err.message});
});


app.listen(8080,function(){
    console.log('now listening for requests');
});

module.exports = app;
