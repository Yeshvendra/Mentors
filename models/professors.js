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
    }
});

const Professor = module.exports = mongoose.model('Professor', ProfessorSchema);