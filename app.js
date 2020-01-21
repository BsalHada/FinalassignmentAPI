const express = require('express');
const app = express()
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const subjectRoutes = require('./api/routes/subjects');
const batchRoutes = require('./api/routes/batchs');
const roomRoutes = require('./api/routes/rooms');
const teacherRoutes = require('./api/routes/teachers');
const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb://localhost:27017/notifySchedule', 
{ useNewUrlParser: true })

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/notify_subjects', subjectRoutes);
app.use('/notify_batchs', batchRoutes);
app.use('/notify_rooms', roomRoutes);
app.use('/notify_teachers', teacherRoutes);
app.use('/notify_user', userRoutes);

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status= 404;
    next(error);
    
});

app.use((error, req,res,next) => {

        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
});
module.exports = app; 