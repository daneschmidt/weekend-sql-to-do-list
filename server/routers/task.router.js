const express = require('express');
const router = express.Router();



const taskArray = [];

router.get('/', (req, res) => {
    res.send(200);

});

router.post('/', (req,res) => {
    res.sendStatus(201);

})

module.exports = router;