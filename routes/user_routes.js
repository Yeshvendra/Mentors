var express = require("express");
var router = express.Router();
var User = require("../models/user");

// ============================================
// AUTH ROUTES
//=============================================
router.get("/register", function (req, res) {
    res.render("users/register");
});

router.post("/register", async (req, res) => {
    console.log(req.body);
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
});

// Login route
router.get("/login", async (req, res) => {
    res.render("users/login");
});

router.post("/login", function (req, res) {
    res.send(req.body);
});

module.exports = router;