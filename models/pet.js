'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    
    name: { type: String, required: true },
    species: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    dateBorn: {type: Date, required: true},
        
});

module.exports = mongoose.model('Pet', PetSchema);
