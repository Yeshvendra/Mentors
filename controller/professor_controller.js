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

    // retrieve professor information
    async getProfessor(profId)
    {
        try{
            let professor = await Professor.findOne({_id: profId}).populate("projects").populate("institute");
            return professor
        }
        catch(err){
            return {msg: 'Failed to retrieve all professors. Error: ' + err};
        }
    }

    // add a professor
    async addProfessor(prof)
    {
        let newProfessor = new Professor({
            title: prof.title,
            first_name: prof.first_name,
            middle_name: prof.middle_name,
            last_name: prof.last_name,
            phone: prof.phone,
            email: prof.email,
            designation: prof.designation,
            department: prof.department,
            googleScholarUrl: prof.googleScholarUrl,
            linkedInUrl: prof.linkedInUrl,
            personalWebsite: prof.personalWebsite,
            projects: prof.projects,
            institute: prof.institute,
            profilePictureURL: prof.profilePictureURL
        });
    
        await newProfessor.save();
        return {msg: 'Professor added successfully'};
    }
}

module.exports = new ProfessorController();