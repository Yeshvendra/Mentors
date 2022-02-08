const Institute = require('../models/institutes');

class InstituteController
{
    constructor() {}

    // retrieve all institutes
    async getAllInstitutes()
    {
        try{
            let institutes = await Institute.find();
            return institutes;
        }
        catch(err){
            return {msg: 'Failed to retrieve all institutes. Error: ' + err};
        }
    }

    // add an institute
    async addInstitute(inst)
    {
        let newInstitute = new Institute({
            name: inst.name,
            address: inst.address,
            phone: inst.phone,
            email: inst.email,
            website: inst.website
        });
    
        await newInstitute.save();
        return {msg: 'Institute added successfully'};
    }
}

module.exports = new InstituteController();