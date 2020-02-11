const express = require('express');
const DB = require('../data/db');

const router = express.Router();

/**
 * GET posts
 */
router.get('/', (req, res) => {
    DB.find().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

module.exports = router;