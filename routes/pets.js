'use strict'

const express = require('express');
const PetsController = require('../controllers/pets');
const api = express.Router();

 
api.post('/createpet', PetsController.createPet);
api.get('/getpets/:page?', PetsController.getPets);
api.get('/getpet/:id', PetsController.getPet);
api.put('/updatepet/:id', PetsController.updatePet);
api.delete('/deletepet/:id', PetsController.deletePet);
api.get('/largestspecies', PetsController.largestSpecies2);
api.get('/averageage/:specie', PetsController.averageAge);
api.get('/standardagedeviation/:specie', PetsController.standardAgeDeviation);

module.exports = api;