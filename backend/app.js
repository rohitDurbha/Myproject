require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');
const app = express();

// var port = process.env.PORT || 8080;

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    
});

// app.get("/", function(req, res){
//     res.send("<h1>Hello Bro!</h1>")
// });

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));

//app.listen(port, ip,() => console.log(`Server started at port : ${process.env.PORT}`));

// exports = module.exports = app; 