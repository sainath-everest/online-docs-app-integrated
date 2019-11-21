const express = require('express');
const routes = require('./routes/router');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
let config = require('config');
let retry = require('async-retry');

const app = express();

mongoose.Promise = global.Promise;
const dbConncetion = async(bail, number) => {
    console.log("Trying to connect:", number);
    await mongoose.connect(config.DBHOst);
    bail('DB connection successfull');
}

retry(dbConncetion, {retries: 100, minTimeout:5000}).catch(error=>{
    console.log(error);
})


 

app.use(bodyParser.json());

app.use(cors());
app.use('/api',routes);

app.use(function(err,req,res,next){
    res.send({error : err.message});
});


app.listen(8080,function(){
    console.log('now listening for requests');
});

module.exports = app;
