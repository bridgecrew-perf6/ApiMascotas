'use strict'
const Pet = require('../models/pet');

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

    await Pet.aggregate([
        {
            $group: {
                _id: "$species",
                count: { $sum: 1 },
                averageAge: { $avg: "$age" }
            }
        }
    ]).then(function(data) {
         data.forEach(function(item) {
            if(item._id == specie){
                averageAge = item.averageAge;
                count = item.count;
            }
        });
        result = averageAge;
    });
 
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
                stdDevSamp: { $stdDevSamp: "$age" } //desviation
            }
        }
    ]).then(function(data) {

        data.forEach(function(item) {
            if(item._id == specie){
                count = item.count;
                result = item.stdDevSamp;
            }
        });
     });

    const dataResult = {
        specie: specie,
        standardAgeDeviation: result,
        Count: count
    }
    return dataResult;
}

exports.calculateAge = async function(fecha) {
    var today = new Date();
    var birthday = new Date(fecha);
    var age = today.getFullYear() - birthday.getFullYear();

    return age;
}