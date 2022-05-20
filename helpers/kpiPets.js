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
