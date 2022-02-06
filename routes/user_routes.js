const express = require("express");
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require("../models/user");
const ProfessorController = require("../controller/professor_controller");
const users = require("../controller/users_controller");
const middleware = require("../middleware/auth_middleware");
// ============================================
// AUTH ROUTES
//=============================================
router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

router.get("/secret", middleware.isLoggedIn, async (req, res) => {
    res.send("hello secret user!!")
});

module.exports = router;