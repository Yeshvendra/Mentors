const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth_middleware");

const ProfessorController = require('../controller/professor_controller');

router.get('/home', async (req, res) => {
    let professors = await ProfessorController.getAllProfessors();
    res.render("users/home", {professorList: professors});
});

router.get('/addMentor', authMiddleware.isLoggedIn, async(req, res) => {
    res.render("mentors/addMentor");
});

router.get('/addInstitute', authMiddleware.isLoggedIn, async(req, res) => {
    res.render("addInstitute");
});

module.exports = router;