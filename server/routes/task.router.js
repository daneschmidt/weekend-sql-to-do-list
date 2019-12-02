const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "tasklist" ORDER BY "id" DESC`)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.warn(err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    const newTask = req.body;

    const queryString = `INSERT INTO "tasklist" (task, complete, delete) VALUES 
    ('${newTask.task}', '${newTask.complete}', '${newTask.delete}');`;

    pool.query(queryString)
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res) => {

    const queryString = `DELETE FROM "tasklist" WHERE "id" = ${req.params.id};`;

    pool.query(queryString)
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500);
        })

});

router.put('/:id', (req, res) => {
    const complete = req.body.complete;


    pool.query(`UPDATE "tasklist" SET "complete"='yes' WHERE "id" = ${req.params.id};`)
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })

});

module.exports = router;