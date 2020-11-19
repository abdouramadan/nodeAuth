const express = require('express');
const mongoose = require('mongoose');
const port     = 3000
const router = require('./route/authRoutes')
const bodyParser    = require('body-parser')
const cokkieParser = require('cookie-parser')

const app = express();

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cokkieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://abdoudev36:Awawgogo123@cluster0.4pbdw.mongodb.net/nodeAuths?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then((result) => console.log(1))
    .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(router)

/*
    // set cookies
    app.get('/set-cookies', (req, res) => {
        // res.setHeader('Set-Cookie', 'newUser=true')

        // @or
        res.cookie('name', 'abdou ramadan')
        res.cookie('newUser', false, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true})
        res.send('you get the cookie ...')
    })

    // read cookies
    app.get('/read-cookies', (req, res) => {
        const cookies = req.cookies
        console.log(cookies)
        res.json(cookies)
    })
*/

// server
app.listen(port, () => console.log('server running'))