require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
require('./config/passport')(passport);
// still not working
const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// controllers comment
const users = require('./controllers/users');
const notes = require('./controllers/notelist');

// home route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the backend"
    });
});

app.use('/users', users);
app.use('/note', notes)

app.listen(PORT, () => {
    console.log(`Server listening on PORT`, PORT);
});