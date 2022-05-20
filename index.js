'use strict'
const dotenv = require("dotenv");
const mongoose = require('mongoose')
const app = require('./app')

dotenv.config();

const port = process.env.PORT || 8000;
const server = process.env.SERVER || 'localhost';

mongoose.connect( 'mongodb+srv://admin:mongoadmin@cluster0.h04ha.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }, (err, res) => {
try{

  if (err) {
    throw err;
  }else{
    console.log('database connected');
    app.listen(port, () => {
      console.log('Server on port ' + port);
    });
  }
}catch(err){
    console.log(err);
  }
})