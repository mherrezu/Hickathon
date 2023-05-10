const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const absencesRouter = require('./routes/absencesroute');
const loginRouter = require('./routes/loginroute');
const app = express();
app.use(bodyParser.json());

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/absences', absencesRouter);
app.use('/api/login', loginRouter);
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});