const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');


// collection api -> added
router.get('/',(req,res,next) => {
    User.find()
    .exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err 
        });
    });
});

router.post('/',(req,res,next) => {

    const user = new User({
        id: new mongoose.Schema.Types.ObjectId(),
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        user_batch: req.body.user_batch,
        
    });
    user.save().then(result => {
            console.log(result);
            res.status(201).json({
                message:'Handling POST requests to /users',
                createdUser: result
        });

    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
});

router.get('/:userID', (req,res,next) => {
         req.params.userID;
       const id = req.params.userID;
       user.find({id}).exec()
       .then(doc => {
           console.log("From database",doc);
           if(doc) {
            res.status(200).json(doc);
           }else{
               res.status(404).json({
                   message: 'No valid entry found'
               });
           }
           
       }).catch(err => {
           console.log(err);
           res.status(500).json({error:err});
       });
});

router.patch('/:userID', (req,res,next) => {
    const id = req.params.userID;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update({id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
        
    });
});

router.delete('/:userID', (req,res,next) => {
    const id = req.params.userID;
    User.remove({id})
        .exec()
        .then(result => {
                res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;