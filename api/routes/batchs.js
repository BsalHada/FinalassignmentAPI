const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Batch = require('../models/batch');


// collection api -> added
router.get('/',(req,res,next) => {
    Batch.find()
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


    const batch = new Batch({
        id: new mongoose.Schema.Types.ObjectId(),
        batch_name: req.body.batch_name,
        batch_year: req.body.batch_year,
        
    });
    batch.save().then(result => {
            console.log(result);
            res.status(201).json({
                message:'Handling POST requests to /batchs',
                createdBatch: result
        });

    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
});

router.get('/:batchID', (req,res,next) => {
    req.params.batchID;
  const id = req.params.batchID;
  batch.find({id}).exec()
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

router.patch('/:batchID', (req,res,next) => {
const id = req.params.batchID;
const updateOps = {};
for(const ops of req.body){
   updateOps[ops.propName] = ops.value;
}
Batch.update({id}, {$set: updateOps})
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

router.delete('/:batchID', (req,res,next) => {
const id = req.params.batchID;
Batch.remove({id})
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