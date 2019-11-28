const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req,res) => {
    pool.query(`SELECT * FROM "tasklist"`)
    .then((response) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.warn(err);
        res.sendStatus(500);
    })
})

module.exports = router;