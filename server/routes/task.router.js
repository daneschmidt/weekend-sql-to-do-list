const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req,res) => {
    pool.query(`SELECT * FROM "tasklist"`)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        console.warn(err);
        res.sendStatus(500);
    });
});

router.post('/', (req,res) => {
    const newTask = req.body;
    // console.log(newTask);
    
    const queryString = `INSERT INTO "tasklist" (task, complete, delete) VALUES 
    ('${newTask.task}', '${newTask.complete}', '${newTask.delete}');`;

    pool.query(queryString)
        .then((response) => {
            // console.log(response);
            res.sendStatus(201);
        })
        .catch((err) => {
            // console.log(err);
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res) => {
    console.log(req.params.id);

    const queryString = `DELETE FROM "tasklist" WHERE "id" = ${req.params.id};`;

    pool.query(queryString)
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500);
        })

});

// router.put('/:id' (req,res) => {


// });

module.exports = router;