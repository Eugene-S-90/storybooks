const express = require('express');
const mongoose = require('mongoose');
const passport = require ('passport');
// passport config

require('./config/passport')(passport);

// LOAD ROUTES
const auth = require('./routes/auth')

const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("hello,nigga");
});

// USE ROUTES
app.use('/auth', auth)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

