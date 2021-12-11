const express = require('express');
const router = express.Router();

router.get("/professor", (req, res) => {
    res.send("Get all professors");
});

module.exports = router;