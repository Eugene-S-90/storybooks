const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// LOAD USER MODEL
require('./models/User')

// passport config
require('./config/passport')(passport);

// LOAD ROUTES
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');



// LOAD KEYS
const keys = require('./config/keys');

// MAP GOOGLE PROMISE
mongoose.Promise = global.Promise;

// mongoose connect
mongoose.connect(keys.mongoURI)
    .then(() =>
        console.log('mongoDb is connected'))
    .catch(err => console.log(err))

const app = express();

// HANDLEBARS MIDDLEWARE

app.engine('handlebars',exphbs({
    defaultLayout:'main'
}));
app.set('view engine','handlebars')

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUnitialized: false
}))

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})


const port = process.env.PORT || 5000;

// SET STATIC FOLDER

app.use(express.static(path.join(__dirname, 'public')));

// USE ROUTES
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

