'use strict'
const Pet = require('../models/pet');
const mongoose = require('mongoose');
const pet = require('../models/pet');
const { ConditionalNodeDependencies } = require('mathjs');


 exports.largestSpecies = async function() {
    let objSpecies = {};
    let specieWinner = "";

    //mongodb query group by species get max
    await Pet.aggregate([
        {
            $group: {
                _id: "$species",
                count: { $sum: 1 }
            }
        }
    ]).then(function(data) {
       //save in objSpecies max count of species
         data.forEach(function(item) {
            objSpecies[item._id] = item.count;
        });
        //get item of objSpecies with max value:
        specieWinner = Object.keys(objSpecies).reduce((a, b) => objSpecies[a] > objSpecies[b] ? a : b);
    });
    //build object 
    const dataResult = {
        Specie: specieWinner,
        Count: objSpecies[specieWinner]
    }
    return dataResult;
}

exports.averageAge = async function(specie) {
    let averageAge = 0;
    let count = 0;
    let result = 0;


    //mongodb query group by species get max
    await Pet.aggregate([
        {
            $group: {
                _id: "$species",
                count: { $sum: 1 },
                averageAge: { $avg: "$age" }
            }
        }
    ]).then(function(data) {
       //save in objSpecies max count of species
       console.log(data);
         data.forEach(function(item) {
            if(item._id == specie){
                averageAge = item.averageAge;
                count = item.count;
            }
        });
        result = averageAge;
    });
    //build object 
    const dataResult = {
        specie: specie,
        averageAge: result,
        Count: count
    }
    return dataResult;

}

exports.standardAgeDeviation = async function(specie) {
    let count = 0;
    let result = 0;

    await Pet.aggregate([
        {
            $group: {
                _id: "$species",
                count: { $sum: 1 },
                stdDevSamp: { $stdDevSamp: "$age" }
            }
        }
    ]).then(function(data) {
        console.log(data);
        
        //desviation:
        data.forEach(function(item) {
            if(item._id == specie){
                count = item.count;
                result = item.stdDevSamp;
            }
        });
     });
    //build object
    const dataResult = {
        specie: specie,
        standardAgeDeviation: result,
        Count: count
    }
    return dataResult;
}