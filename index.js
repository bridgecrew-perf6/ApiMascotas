'use strict'
const dotenv = require("dotenv");
const mongoose = require('mongoose')
const app = require('./app')

dotenv.config();

const port = process.env.PORT || 8000;
const server = process.env.SERVER || 'localhost';

mongoose.connect( server, { useNewUrlParser: true }, (err, res) => {
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