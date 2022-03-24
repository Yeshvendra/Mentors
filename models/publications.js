const mongoose = require('mongoose');

const PublicationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    publisherDetail: {
        type: String,
        required: true
    },
    yearOfPublication: {
        type: Number,
        required: true
    },
    contributors: {
        type: String,
        required: true
    },
    citationString: {
        type: String,
        required: false
    }
});

const Publication = module.exports = mongoose.model('Publication', PublicationSchema);