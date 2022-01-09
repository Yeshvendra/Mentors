const express = require('express');
const router = express.Router();

const Professor = require('../models/professors');

// retrieve all professors
router.get("/professors", (req, res) => {
    Professor.find((err, professors) => {
        if(err)
        {
            res.json({msg: 'Failed to retrieve all professors. Error: ' + err});
        }
        else
        {
            res.json(professors);
        }
    });
});

// add professor
router.post("/professor", (req, res) => {
    let newProfessor = new Professor({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        designation: req.body.designation,
        googleScholarUrl: req.body.googleScholarUrl,
        linkedInUrl: req.body.linkedInUrl,
        personalWebsite: req.body.personalWebsite
    });

    newProfessor.save((err, result) => {
        if(err)
        {
            res.json({msg: 'Failed to add Professor. Error: ' + err});
        }
        else
        {
            res.json({msg: 'Professor added successfully'});
        }
    });
});

// delete professor
router.delete("/professor/:id", (req, res) => {
    Professor.deleteOne({_id: req.params.id}, (err, result)=>{
        if(err)
        {
            res.json({msg: 'Failed to delete professor with id: ' + req.params.id + '. Error: ' + err});
        }
        else
        {
            res.json({msg: 'Professor deleted successfully'});
        }
    });
});

// edit professor
router.put("/professor/:id", (req, res) => {
    Professor.findOneAndUpdate({_id: req.params.id}, req.body, (err, result) => {
        if(err)
        {
            res.json({msg: 'Failed to update professor with id: ' + req.params.id + '. Error: ' + err});
        }
        else
        {
            res.json({msg: 'Professor edited successfully'});
        }
    });
});

// find professor
router.get("/professor/:id", (req, res) => {
    Professor.findOne({_id: req.params.id}, (err, professor) => {
        if(err)
        {
            res.json({msg: 'Failed to get professor with id: ' + req.params.id + '. Error: ' + err});
        }
        else
        {
            res.json(professor);
        }
    });
});

module.exports = router;