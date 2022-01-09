const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keywords: {
        type: [String]
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    }
});

const Project = module.exports = mongoose.model('Project', ProjectSchema);