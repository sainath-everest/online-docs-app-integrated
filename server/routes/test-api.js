const express = require('express');
const userRouter  = express.Router();
const User = require('../model/user');


userRouter.get('/users',function(req,res,next) {
    User.find({}).then(function(users){
        res.send(users);
    });
    
    
});
userRouter.post('/users',function(req,res,next) {
   // var user = new User(req.body);
    //user.save();
    User.create(req.body).then(function(user){
        res.send(user)
    }).catch(next);   
});
userRouter.put('/users/:id',function(req,res,next) {
    // User.findByIdAndUpdate({_id : req.params.id},req.body,{new:true} )
    //     .then(function(user){
    //         res.send(user);
    //     });

    User.findByIdAndUpdate({_id : req.params.id},req.body)
        .then(function(){
            User.findOne({_id : req.params.id}).then(function(user){
                res.send(user);
            });
        });
    
    
});
userRouter.delete('/users/:id',function(req,res,next) {
   User.findByIdAndRemove({_id : req.params.id})
        .then(function(user){
            res.send(user);

   });
    
});

module.exports = userRouter  ;