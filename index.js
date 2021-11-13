const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();

app.use(cors());

app.use('/routines', routes);

// Spawn child process to display boot up routine
app.set('display', spawn('python', [`${process.cwd()}/src/routines/bootup.py`]));



let routeFiles = ['routes'];
const routeManager = require('./routes/manager');
routeFiles.forEach((file) => {
        let component = require(`./routes/${file}`);
        routeManager.apply(app, component);
});




app.listen(80, "localhost");