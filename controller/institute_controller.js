const Institute = require('../models/institutes');

class InstituteController
{
    constructor() {}

    // add an institute
    async addInstitute(inst)
    {
        try{
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
        catch(err){
            return {msg: 'Failed to add Institute. Error: ' + err};
        }
    }
}

module.exports = new InstituteController();