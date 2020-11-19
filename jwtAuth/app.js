const express = require('express');
const mongoose = require('mongoose');
const port     = 3000
const router = require('./route/authRoutes')
const bodyParser    = require('body-parser')

const app = express();

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

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

// server
app.listen(port, () => console.log('server running'))