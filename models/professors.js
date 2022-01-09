const mongoose = require('mongoose');

const ProfessorSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    designation: {
        type: String
    },
    googleScholarUrl: {
        type: String
    },
    linkedInUrl: {
        type: String
    },
    personalWebsite: {
        type: String
    }
});

const Professor = module.exports = mongoose.model('Professor', ProfessorSchema);