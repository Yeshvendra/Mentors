const express = require('express');
const router = express.Router();

const Institute = require('../models/institutes');

const InstituteController = require('../controller/institute_controller');

// retrieve all institutes
router.get("/institutes", (req, res) => {
    Institute.find((err, institutes) => {
        if(err)
        {
            res.json({msg: 'Failed to retrieve all institutes. Error: ' + err});
        }
        else
        {
            res.json(institutes);
        }
    });
});

// add institute
router.post("/institute", async (req, res) => {
    try{
        let result = await InstituteController.addInstitute(req.body);
        res.json(result);
    }
    catch(err)
    {
        return {msg: 'Failed to add Institute. Error: ' + err};
    }
});

// delete institute
router.delete("/institute/:id", (req, res) => {
    Institute.deleteOne({_id: req.params.id}, (err, result)=>{
        if(err)
        {
            res.json({msg: 'Failed to delete institute with id: ' + req.params.id + '. Error: ' + err});
        }
        else
        {
            res.json({msg: 'Institute deleted successfully'});
        }
    });
});

// edit institute
router.put("/institute/:id", (req, res) => {
    Institute.findOneAndUpdate({_id: req.params.id}, req.body, (err, result) => {
        if(err)
        {
            res.json({msg: 'Failed to update institute with id: ' + req.params.id + '. Error: ' + err});
        }
        else
        {
            res.json({msg: 'Institute edited successfully'});
        }
    });
});

// find institute
router.get("/institute/:id", (req, res) => {
    Institute.findOne({_id: req.params.id}, (err, institute) => {
        if(err)
        {
            res.json({msg: 'Failed to get institute with id: ' + req.params.id + '. Error: ' + err});
        }
        else
        {
            res.json(institute);
        }
    });
});

module.exports = router;