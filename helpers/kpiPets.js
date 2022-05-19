'use strict'
const Pet = require('../models/pet');
const mongoose = require('mongoose');
const pet = require('../models/pet');


 exports.largestSpecies = async function() {
    let arrSpecies = [];
    let arrSpeciesCount = [];
    let objSpecies = {};
    let specieWinner = "";
    const pet = await Pet.find({});
    // Pet.find({}, (err, pets) => {
          arrSpecies = pet.map(pet => pet.species); //get all species in array
    //get values of species no repeted:
    for(let i = 0; i < arrSpecies.length; i++) {
        //add species to array arrSpecies:
        if(arrSpecies) {
            arrSpeciesCount.push(arrSpecies[i]);
        }
    }  
    //count number of diferent species in array:   
    for(let i = 0; i < arrSpeciesCount.length; i++) {
        let count = 0;
        for(let j = 0; j < arrSpecies.length; j++) {
            if(arrSpecies[j] === arrSpeciesCount[i]) {
                count++;
            }
        }
        objSpecies[arrSpeciesCount[i]] = count;
    }
    //find max value of object:
    let max = 0;
    for(const [key, value] of Object.entries(objSpecies)) {
        if(value > max) {
            max = value;
            specieWinner = key;
        }
    }

    const dataResult = {
        Specie: specieWinner,
        Count: max
    }
    return dataResult;
}
