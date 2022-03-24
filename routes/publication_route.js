const express = require('express');
const router = express.Router();

const Publication = require('../models/publications');

// retrieve all publications
router.get("/publications", (req, res) => {
    Publication.find((err, publications) => {
        if(err)
        {
            res.json({msg: 'Failed to retrieve all publications. Error: ' + err});
        }
        else
        {
            res.json(publications);
        }
    });
});

// add publications
router.post("/publication", (req, res) => {
    let newPublication = new Publication({
        title: req.body.title,
        description: req.body.description,
        publisherDetail: req.body.publisherDetail,
        yearOfPublication: req.body.yearOfPublication,
        contributors: req.body.contributors,
        citationString: req.body.citationString
    });

    newPublication.save((err, result) => {
        if(err)
        {
            res.json({msg: 'Failed to add Publication. Error: ' + err});
        }
        else
        {
            res.json({msg: 'Publication added successfully'});
        }
    });
});

// delete publication
router.delete("/publication/:id", (req, res) => {
    Publication.deleteOne({_id: req.params.id}, (err, result)=>{
        if(err)
        {
            res.json({msg: 'Failed to delete publication with id: ' + req.params.id + '. Error: ' + err});
        }
        else
        {
            res.json({msg: 'Publication deleted successfully'});
        }
    });
});

// edit publication
router.put("/publication/:id", (req, res) => {
    Publication.findOneAndUpdate({_id: req.params.id}, req.body, (err, result) => {
        if(err)
        {
            res.json({msg: 'Failed to update publication with id: ' + req.params.id + '. Error: ' + err});
        }
        else
        {
            res.json({msg: 'Publication edited successfully'});
        }
    });
});

// find publication
router.get("/publication/:id", (req, res) => {
    Publication.findOne({_id: req.params.id}, (err, publication) => {
        if(err)
        {
            res.json({msg: 'Failed to get publication with id: ' + req.params.id + '. Error: ' + err});
        }
        else
        {
            res.json(publication);
        }
    });
});

module.exports = router;