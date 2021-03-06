const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const hbs = require('hbs')

const {sentimentAPI} = require('./../api/sentimentAPI')
const {categoryAPI} = require('./../api/categoryAPI')
const {spamAPI} = require('./../api/spamAPI')

global.fetch = require('node-fetch')

const port = 3000
const app = express()

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Context Analyzer'
    })
})

app.get('/sentiment', (req, res) => {
    res.render('sentiment', {
        title: 'SENTIMENT ANALYSIS'
    })
})

app.post('/predict-sentiment', (req, res) => {

    sentimentAPI(req, res)
        
})

app.get('/category', (req, res) => {
    res.render('category', {
        title: 'CATEGORY PREDICTION'
    })
})

app.post('/predict-category', (req, res) => {

    categoryAPI(req, res)

})

app.get('/spam', (req, res) => {
    res.render('spam', {
        title: 'SPAM DETECTION'
    })
})

app.post('/predict-spam', (req, res) => {

    spamAPI(req, res)
        
})

app.get('/api', (req, res) => {
    res.render('api', {
        title: 'CONTEXT ANALYZER API'
    })
})

app.get('/api/sentiment', (req, res) => {
    sentimentAPI(req, res)
})

app.get('/api/category', (req, res) => {
    categoryAPI(req, res)
})

app.get('/api/spam', (req, res) => {
    spamAPI(req, res)
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Invalid URL'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})