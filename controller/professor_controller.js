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
            let professors = await Professor.find().populate("projects").populate("institute").populate("publications");
            return professors;
        }
        catch(err){
            return {msg: 'Failed to retrieve all professors. Error: ' + err};
        }
    }    

    // retrieve l number of  professors using searchByKey text from s location
    async getAllProfessorsByKey(searchByKey, s, l)
    {
        try{
            searchByKey.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            const regex = new RegExp(searchByKey, 'gi');
            const expression = {
                "$expr": {
                    "$regexMatch": {
                        "input": { "$concat": ["$first_name", " ", "$middle_name", " ", "$last_name", " ", "$areaOfInterest"] },
                        "regex": regex
                    }
                }
            };
            let professors = await Professor.find(expression).skip(s).limit(l).populate("projects").populate("institute").populate("publications");
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
            let professor = await Professor.findOne({_id: profId}).populate("projects").populate("institute").populate("publications");
            return professor
        }
        catch(err){
            return {msg: 'Failed to retrieve all professors. Error: ' + err};
        }
    }

    // count number of professors using searchByKey 
    async countProfessors(searchByKey)
    {
        searchByKey.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        const regex = new RegExp(searchByKey, 'gi');
        const expression = {
            "$expr": {
                "$regexMatch": {
                    "input": { "$concat": ["$first_name", " ", "$middle_name", " ", "$last_name", " ", "$areaOfInterest"] },
                    "regex": regex
                }
            }
        };
        let numberOfProf = await Professor.countDocuments(expression);
        return numberOfProf;
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
            publications: prof.publications,
            institute: prof.institute,
            profilePictureURL: prof.profilePictureURL,
            areaOfInterest: prof.areaOfInterest
        });
    
        await newProfessor.save();
        return {msg: 'Professor added successfully'};
    }
}

module.exports = new ProfessorController();