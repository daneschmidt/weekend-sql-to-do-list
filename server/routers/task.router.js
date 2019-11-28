const express = require('express');
const router = express.Router();



const taskArray = [];

router.get('/', (req, res) => {
    res.send(taskArray);

});

router.post('/', (req,res) => {
    taskArray.push(req.body.task);
    res.sendStatus(201);

})

module.exports = router;