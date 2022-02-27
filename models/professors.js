const mongoose = require('mongoose');

const ProfessorSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    middle_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: false
    },
    department: {
        type: String,
        required: false
    },
    googleScholarUrl: {
        type: String,
        required: false
    },
    linkedInUrl: {
        type: String,
        required: false
    },
    personalWebsite: {
        type: String,
        required: false
    },
    projects:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: false
    }],
    institute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institute",
        required: false
    },
    profilePictureURL: {
        type: String,
        required: false
    },
    areaOfInterest: [{
        type: String,
        required: false  
    }]
});

const Professor = module.exports = mongoose.model('Professor', ProfessorSchema);