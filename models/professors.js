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
    }
});

const Professor = module.exports = mongoose.model('Professor', ProfessorSchema);