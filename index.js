const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const { BASEPATH } = require('./config');

const app = express();

app.set("trust proxy", 1);
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());

// app.use('/routines', routes);

// Spawn child process to display boot up routine
app.set('display', spawn('python', [`${BASEPATH}/routines/bootup.py`]));



let routeFiles = ['routes'];
const routeManager = require('./routes/manager');
routeFiles.forEach((file) => {
        let component = require(`./routes/${file}`);
        routeManager.apply(app, component);
});




app.listen(3000);