const express = require('express');
const router = express.Router();

const Professor = require('../models/professors');
const Project = require('../models/projects');
const Institute = require('../models/institutes');

const ProfessorController = require('../controller/professor_controller');

// retrieve all professors
router.get("/professors", async (req, res) => {
    let result = await ProfessorController.getAllProfessors();
    res.json(result);
});

// add professor
router.post("/professor", async (req, res) => {
    try{
        let result = await ProfessorController.addProfessor(req.body);
        res.json(result);
    }
    catch(err){
        return {msg: 'Failed to add Professor. Error: ' + err};
    }
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
    }).populate("projects").populate("institute");
});

// add project to professor
router.post("/professor/:id/project", (req, res) => {
    Project.findOne({_id: req.body.ProjectId}, (err, project) => {
        if(err)
        {
            res.json({msg: 'Failed to add project to professor with id: ' + 
                      req.params.id + '. ProjectId was not found. Error: ' + err + '.'});
        }
        else
        {
            Professor.findOne({_id: req.params.id}, (err, professor) => {
                if(err)
                {
                    res.json({msg: 'Failed to add project to professor with id: ' + 
                              req.params.id + '.ProfessorId was not found. Error: ' + err});
                }
                else
                {
                    let professorProjects = {
                        projects: professor.projects
                    };

                    const index = professorProjects.projects.indexOf(project._id);
                    if(index > -1)
                    {
                        res.json({msg: 'Project already exist with id: ' + project._id});
                        return;
                    }

                    professorProjects.projects.push(project._id);

                    Professor.findOneAndUpdate({_id: req.params.id}, {$set: professorProjects}, (err, result) => {
                        if(err)
                        {
                            res.json({msg: 'Failed to add project to professor with id: ' + 
                                      req.params.id + '. Error: ' + err});
                        }
                        else
                        {
                            res.json({msg: 'Project added to professor successfully'});
                        }
                    });
                }
            });
        }
    });
});

// delete project from professor
router.delete("/professor/:id/project/:projectId", (req, res) => {
    Professor.findOne({_id: req.params.id}, (err, professor) => {
        if(err)
        {
            res.json({msg: 'Failed to delete project from professor with id: ' + 
                      req.params.id + '. ProfessorId was not found. Error: ' + err + '.'});
        }
        else
        {
            let professorProjects = {
                projects: professor.projects
            }
            
            let index = professorProjects.projects.indexOf(req.params.projectId);

            if(index > -1)
            {
                professorProjects.projects.splice(index, 1);
            }
            else
            {
                res.json({msg: 'Project with id: "' + req.params.projectId + '" does not exists for professor with id: "' + req.params.id + '".'});
            }

            Professor.findOneAndUpdate({_id: req.params.id}, {$set: professorProjects}, (err, result) => {
                if(err)
                {
                    res.json({msg: 'Failed to delete project from professor with id: ' + 
                              req.params.id + '. Error: ' + err});
                }
                else
                {
                    res.json({msg: 'Project deleted from professor successfully'});
                }
            });
        }
    });
});

// add institute to professor
router.post("/professor/:id/institute", (req, res) => {
    Institute.findOne({_id: req.body.InstituteId}, (err, institute) => {
        if(err)
        {
            res.json({msg: 'Failed to add institute to professor with id: ' + 
                      req.params.id + '. InstituteId was not found. Error: ' + err + '.'});
        }
        else
        {
            Professor.findOneAndUpdate({_id: req.params.id}, {$set: {institute: req.body.InstituteId}}, (err, result) => {
                if(err)
                {
                    res.json({msg: 'Failed to add institute to professor with id: ' + 
                              req.params.id + '. Error: ' + err});
                }
                else
                {
                    res.json({msg: 'Institute added to professor successfully'});
                }
            });
        }
    });
});

// delete institute from professor
router.delete("/professor/:id/institute", (req, res) => {
    Professor.findOneAndUpdate({_id: req.params.id}, {$unset: {institute: 1}}, (err, result) => {
        if(err)
        {
            res.json({msg: 'Failed to delete institute from professor with id: ' + 
                      req.params.id + '. Error: ' + err});
        }
        else
        {
            res.json({msg: 'Institute deleted from professor successfully'});
        }
    });
});



module.exports = router;