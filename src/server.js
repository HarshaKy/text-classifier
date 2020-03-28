const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs')

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
        title: 'Sentiment Analysis'
    })
})

app.post('/predict-sentiment', (req, res) => {

    async function processModel(){
        const model = await tf.loadLayersModel('file://../models/sentiment/model-v2.json')
        
        console.log('before python')

        var spawn = require("child_process").spawnSync
        var process = await spawn('python',["./../utils/preprocess-sentiment-v2.py", req.body.test] )

        console.log(JSON.parse(process.stdout))

        var data = JSON.parse(process.stdout)

        prediciton = model.predict(tf.tensor(data)).dataSync()

        res.render('prediction', {
            title: 'Sentiment Prediction',
            prediction: prediciton
        })

    }

    processModel()
        
})

app.get('/category', (req, res) => {
    res.render('category', {
        title: 'Category Prediction'
    })
})

app.post('/predict-category', (req, res) => {

    async function processModel(){
        const model = await tf.loadLayersModel('file://../models/news/model.json')
        
        console.log('before python')

        var spawn = require("child_process").spawnSync
        var process = await spawn('python',["./../utils/preprocess-news.py", req.body.test] );

        console.log(JSON.parse(process.stdout))

        var data = JSON.parse(process.stdout)

        prediciton = model.predict(tf.tensor(data)).dataSync()

        var pred

        var predString = ""

        for (pred in prediciton) {
            predString += prediciton[pred].toString() + " "
        }

        console.log(predString)

        res.render('prediction', {
            title: 'Category Prediction',
            prediction: predString
        })

    }

    processModel()
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/sentiment/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Invalid URL'
    })
})

app.get('/category/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Invalid URL'
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Invalid URL'
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