const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const taskRouter = require('./routers/task.router')


app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/tasks', taskRouter);



app.listen(PORT, () => {
    console.log(`Server is up on port: ${PORT}`);
})