const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const methodOverride = require('method-override');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// LOAD USER MODEL
require('./models/User');
require('./models/Story')

// passport config
require('./config/passport')(passport);

// LOAD ROUTES
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

// LOAD KEYS
const keys = require('./config/keys');

// Handlebars helpers
const {
    truncate,
    stripTags,
    formatDate,
    select,
    editIcon
} = require('./helpers/hbs');

// MAP GOOGLE PROMISE
mongoose.Promise = global.Promise;

// mongoose connect
mongoose.connect(keys.mongoURI)
    .then(() =>
        console.log('mongoDb is connected'))
    .catch(err => console.log(err))

const app = express();

// Method override middleware
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// HANDLEBARS MIDDLEWARE

app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate,
        select,
        editIcon: editIcon
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars')

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

const Server = require('socket.io');
const server = new Server(80);

server.on('connection', (socket) => {
    console.log('Client connected',socket.id);
    socket.on('disconnect', () => console.log('Client disconnected',socket.id));
    socket.on('chat', msg => {
        server.emit('chat', msg);
        console.log('from server msg',msg);
    });
  });