const express = require('express');
const app = express();
const logger = require('morgan');
const coursesRouter = require('./routes/courses.route'); 
const usersRouter = require('./routes/users.route');

app.use(logger('dev'));
app.use(express.json());

app.use('/api/courses',coursesRouter);
app.use('/api/users',usersRouter);

app.listen(3000,()=>{
  console.log("Listenning...");
  
});