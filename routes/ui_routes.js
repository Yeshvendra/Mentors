const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth_middleware");

const ProfessorController = require('../controller/professor_controller');
const InstituteController = require('../controller/institute_controller');

router.get('/home', async (req, res) => {
    let professors = await ProfessorController.getAllProfessors();
    res.render("home", {professorList: professors});
});

router.get('/', async (req, res) => {
    res.redirect('/home');
});

router.get('/addMentor', authMiddleware.isLoggedIn, authMiddleware.isAdmin, async(req, res) => {
    let institutes = await InstituteController.getAllInstitutes();
    res.render("addMentor", {instituteList: institutes});
});

router.post('/addMentor',async (req, res, next) => {
    try {
        ProfessorController.addProfessor(req.body);
        req.flash('success', req.body.first_name + ' ' + req.body.last_name + ' added successfully!');
        res.redirect('addMentor');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('addMentor');
    }
});

router.get('/addInstitute', authMiddleware.isLoggedIn, authMiddleware.isAdmin, async(req, res) => {
    res.render("addInstitute");
});

router.post('/addInstitute', authMiddleware.isLoggedIn, authMiddleware.isAdmin, async (req, res, next) => {
    try {
        InstituteController.addInstitute(req.body);
        req.flash('success', req.body.name + ' added successfully!');
        res.redirect('addInstitute');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('addInstitute');
    }
});

router.get('/mentorInfo', authMiddleware.isLoggedIn, async (req, res, next) => {
    let prof = await ProfessorController.getProfessor(req.query.id);
    res.render("mentorInfo", {professor: prof});
    //res.render("home", {professorList: professors});
});

module.exports = router;