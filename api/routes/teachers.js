const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Teacher = require('../models/teachers');


// collection api -> added
router.get('/',(req,res,next) => {
    Teacher.find()
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


    const teacher = new Teacher({
        id: new mongoose.Schema.Types.ObjectId(),
        teacher_id: req.body.teacher_id,
        teacher_name: req.body.teacher_name,
        
    });
    teacher.save().then(result => {
            console.log(result);
            res.status(201).json({
                message:'Handling POST requests to /teachers',
                createdTeacher: result
        });

    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });

});

router.get('/:teacherID', (req,res,next) => {
         req.params.teacherID;
       const id = req.params.teacherID;
       teacher.find({id}).exec()
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

router.patch('/:teacherID', (req,res,next) => {
    const id = req.params.teacherID;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Teacher.update({id}, {$set: updateOps})
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

router.delete('/:teacherID', (req,res,next) => {
    const id = req.params.teacherID;
    Teacher.remove({id})
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