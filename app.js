const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const coursesRouter = require('./routes/courses.route'); 
const usersRouter = require('./routes/users.route');

const connStr = "mongodb://127.0.0.1:27017/api-db";

mongoose.connect(connStr).then(
  console.log("DB connected.")
  
);

app.use(logger('dev'));
app.use(express.json());

app.use('/api/courses',coursesRouter);
app.use('/api/users',usersRouter);

app.listen(3000,()=>{
  console.log("Listenning...");
  
});