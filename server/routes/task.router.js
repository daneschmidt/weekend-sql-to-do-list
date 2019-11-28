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
    });
});


router.post('/', (req,res) => {
    const newTask = req.body.task;
    console.log(newTask);

    const queryString = `INSERT INTO "tasklist" (task, complete, delete) VALUES 
    ('${newTask.task}', '${newTask.complete}', '${newTask.delete}');`;

    pool.query(queryString)
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});


module.exports = router;