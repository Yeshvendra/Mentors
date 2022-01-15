const express = require("express");
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require("../models/user");
const ProfessorController = require("../controller/professor_controller");

// ============================================
// AUTH ROUTES
//=============================================
router.get("/register", function (req, res) {
    res.render("users/register");
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Mentors!');
            res.redirect('/login');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));


// Login route
router.get("/login", async (req, res) => {
    res.render("users/login");
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/');
})

router.get('/home', async (req, res) => {
    let professors = await ProfessorController.getAllProfessors();
    res.render("users/home", {professorList: professors});
});

module.exports = router;