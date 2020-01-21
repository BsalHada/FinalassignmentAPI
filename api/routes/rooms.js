const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Room = require('../models/rooms');


// collection api -> added
router.get('/',(req,res,next) => {
    Room.find()
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


    const room = new Room({
        id: new mongoose.Schema.Types.ObjectId(),
        room_no: req.body.room_no,
        floor: req.body.floor,
        
    });
    room.save().then(result => {
            console.log(result);
            res.status(201).json({
                message:'Handling POST requests to /rooms',
                createdRoom: result
        });

    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
        
 });

router.get('/:roomID', (req,res,next) => {
         req.params.roomID;
       const id = req.params.roomID;
       room.find({id}).exec()
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

router.patch('/:roomID', (req,res,next) => {
    const id = req.params.roomID;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Room.update({id}, {$set: updateOps})
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

router.delete('/:roomID', (req,res,next) => {
    const id = req.params.roomID;
    Room.remove({id})
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