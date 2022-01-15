const Professor = require('../models/professors');
const Project = require('../models/projects');
const Institute = require('../models/institutes');

class ProfessorController
{
    constructor() {}

    // retrieve all professors
    async getAllProfessors()
    {
        try{
            let professors = await Professor.find().populate("projects").populate("institute");
            return professors;
        }
        catch(err){
            return {msg: 'Failed to retrieve all professors. Error: ' + err};
        }
    }

}

module.exports = new ProfessorController();