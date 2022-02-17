const mongoose = require('mongoose');

const InstituteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: true
    },
    profilePictureURL: {
        type: String,
        required: false
    }
});

const Institute = module.exports = mongoose.model('Institute', InstituteSchema);