const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth_middleware");

const ProfessorController = require('../controller/professor_controller');
const InstituteController = require('../controller/institute_controller');

// Number of professors to be shown on a single page
const resultsPerPage = 6;

router.get('/home', async (req, res) => {
    let searchByName = req.query.searchByName ? req.query.searchByName : "";
    let searchByArea = req.query.searchByArea ? req.query.searchByArea : "";
    let numberOfResults;
    if(searchByArea)
    {
        numberOfResults = await ProfessorController.countProfessorsByArea(searchByArea);
    }
    else
    {
        numberOfResults = await ProfessorController.countProfessorsByName(searchByName);    
    }

    if(numberOfResults < 1)
    {
        res.render("home", {professorList: [], current: 1, pages: 1, searchByName: searchByName, searchByArea: searchByArea});
        return;
    }
    let numberOfPages = Math.ceil(numberOfResults / resultsPerPage);
    let page = req.query.page ? Number(req.query.page) : 1;
    if(page > numberOfPages)
    {
        res.redirect('/?page=' + encodeURIComponent(numberOfPages));
    }
    else if(page < 1)
    {
        res.redirect('/?page=1');
    }

    // Determine the result starting number
    const startingLimit = (page - 1) * resultsPerPage;

    let professors;
    if(searchByArea)
    {
        professors = await ProfessorController.getAllProfessorsByArea(searchByArea, startingLimit, resultsPerPage);
    }
    else
    {
        professors = await ProfessorController.getAllProfessorsByName(searchByName, startingLimit, resultsPerPage);
    }

    res.render("home", {professorList: professors, current: page, pages: numberOfPages, searchByName: searchByName, searchByArea: searchByArea});
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
});

module.exports = router;