'use strict'

const kpiPets = require('../helpers/kpiPets');
const Pet = require('../models/pet');
let mongoosePaginate = require('mongoose-pagination');

//controller create pet:
async function createPet(req, res) {
    const pet = new Pet({
        name: req.body.name,
        species: req.body.species,
        gender: req.body.gender,
        dateBorn: req.body.dateBorn,
    });

    // get age by dateBorn:
    const age = await kpiPets.calculateAge(pet.dateBorn);
    pet.age = age;
    
    pet.save((err, petStored) => {
        if (err) {
            res.status(500).send({ message: "Server error" });
        } else {
            if (!petStored) {
                res.status(404).send({ message: "Can not stored." });
            } else {
                res.status(200).send({ Pet: petStored });
            }
        }
    });
}

async function getPet(req, res) {
    const petId = req.params.id;
     Pet.findById(await petId, (err, pet) => {
        if (err) {
            res.status(500).send({ message: "Server error" });
        } else {
            if (!pet) {
                res.status(404).send({ message: "Pet not found" });
            } else {
                res.status(200).send({ pet });
            }
        }
    });
}

async function getPets(req, res) {
    let page = 1;
    if(req.params.page) {
        page = req.params.page;
    }
    const itemsPerPage = 10;
        Pet.find().sort('name').paginate(page, itemsPerPage, (err, pets, total) => {
            if (err) {
                res.status(500).send({ message: "Server error" });
            } else {
                if (!pets) {
                    res.status(404).send({ message: "Pets not found" });
                } else {
                    res.status(200).send({ pets, total, page, totalPages: Math.ceil(total/itemsPerPage) });
                }
            }
        });    
}

function updatePet(req, res) {
    const petId = req.params.id;
    const update = req.body;

    Pet.findByIdAndUpdate(petId, update, (err, petUpdated) => {
        if (err) {
            res.status(500).send({ message: "Server error" });
        } else {
            if (!petUpdated) {
                res.status(404).send({ message: "Pet not found" });
            } else {
                res.status(200).send({ message: "Pet updated" });
            }
        }
    });
}

function deletePet(req, res) {
    const petId = req.params.id;

    Pet.findById(petId, (err, pet) => {
        if (err) {
            res.status(500).send({ message: "Server error" });
        } else {
            if (!pet) {
                res.status(404).send({ message: "Pet not found" });
            } else {
                pet.remove(err => {
                    if (err) {
                        res.status(500).send({ message: "Server error" });
                    } else {
                        res.status(200).send({ message: "Pet deleted" });
                    }
                });
            }
        }
    });
}

async function largestSpecies2 (req, res) {
    try{
    let speciesWinner = {};
    speciesWinner = await kpiPets.largestSpecies();
    if(speciesWinner) {
        res.status(200).send({ speciesWinner });
    } else {
        res.status(404).send({ message: "Species not found" });
    }
    } catch(err) {
        res.status(500).send({ message: "Server error" });
    }
}

async function averageAge (req, res) {
    const specie = req.params.specie;
    try{
    let averageAge = {};
    averageAge = await kpiPets.averageAge(specie);
    if(averageAge) {
        res.status(200).send({ averageAge });
    } else {
        res.status(404).send({ message: "Average age not found" });
    }
    } catch(err) {
        res.status(500).send({ message: "Server error" });
    }
}

async function standardAgeDeviation (req, res) {
    const specie = req.params.specie;
    try{
    let standardAgeDeviation = {};
    standardAgeDeviation = await kpiPets.standardAgeDeviation(specie);
    if(standardAgeDeviation) {
        res.status(200).send({ standardAgeDeviation });
    } else {
        res.status(404).send({ message: "Standard age deviation not found" });
    }
    } catch(err) {
        res.status(500).send({ message: "Server error" });
    }
}






module.exports = {
    createPet,
    getPet,
    getPets,
    updatePet,
    deletePet,
    largestSpecies2,
    averageAge,
    standardAgeDeviation,

}


