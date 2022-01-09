const express = require('express');
const router = express.Router();

const Project = require('../models/projects');

// retrieve all project
router.get("/projects", (req, res) => {
    Project.find((err, projects) => {
        if(err)
        {
            res.json({msg: 'Failed to retrieve all projects. Error: ' + err});
        }
        else
        {
            res.json(projects);
        }
    });
});

// add project
router.post("/project", (req, res) => {
    let newProject = new Project({
        title: req.body.title,
        description: req.body.description,
        keywords: req.body.keywords,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    });

    newProject.save((err, result) => {
        if(err)
        {
            res.json({msg: 'Failed to add Project. Error: ' + err});
        }
        else
        {
            res.json({msg: 'Project added successfully'});
        }
    });
});

// delete project
router.delete("/project/:id", (req, res) => {
    Project.deleteOne({_id: req.params.id}, (err, result)=>{
        if(err)
        {
            res.json({msg: 'Failed to delete project with id: ' + req.params.id + '. Error: ' + err});
        }
        else
        {
            res.json({msg: 'Project deleted successfully'});
        }
    });
});

// edit project
router.put("/project/:id", (req, res) => {
    Project.findOneAndUpdate({_id: req.params.id}, req.body, (err, result) => {
        if(err)
        {
            res.json({msg: 'Failed to update project with id: ' + req.params.id + '. Error: ' + err});
        }
        else
        {
            res.json({msg: 'Project edited successfully'});
        }
    });
});

// find project
router.get("/project/:id", (req, res) => {
    Project.findOne({_id: req.params.id}, (err, project) => {
        if(err)
        {
            res.json({msg: 'Failed to get project with id: ' + req.params.id + '. Error: ' + err});
        }
        else
        {
            res.json(project);
        }
    });
});

module.exports = router;