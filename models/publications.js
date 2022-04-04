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
    },
    type: {
        type: String, //Can be National Conference, International Conference, Book Chapter, International Journal, National Journal or Book
        required: true
    }
});

const Publication = module.exports = mongoose.model('Publication', PublicationSchema);