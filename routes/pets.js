'use strict'

const express = require('express');
const PetsController = require('../controllers/pets');
const api = express.Router();


// const multipart = require('connect-multiparty');
// const md_upload = multipart({ uploadDir: './uploads' });

//requires a callback function 
api.post('/createpet', PetsController.createPet);
api.get('/getpets', PetsController.getPets);
api.get('/getpet/:id', PetsController.getPet);
api.put('/updatepet/:id', PetsController.updatePet);
api.delete('/deletepet/:id', PetsController.deletePet);


module.exports = api;