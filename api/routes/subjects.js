const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Subject = require('../models/subjects');

// product api
router.get('/',(req,res,next) => {
    Subject.find()
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

    const subject = new Subject({
        id: new mongoose.Schema.Types.ObjectId(),
        sub_code: req.body.sub_code,
        sub_name: req.body.sub_name,
        
    });
    subject.save().then(result => {
            console.log(result);
            res.status(201).json({
                message:'Handling POST requests to /subjects',
                createdSubject: result
        });

    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
});

router.get('/:subjectID', (req,res,next) => {
         req.params.subjectID;
       const id = req.params.subjectID;
       subject.find({id}).exec()
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

router.patch('/:subjectID', (req,res,next) => {
    const id = req.params.subjectID;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Subject.update({id}, {$set: updateOps})
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

router.delete('/:subjectID', (req,res,next) => {
    const id = req.params.subjectID;
    Subject.remove({id})
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