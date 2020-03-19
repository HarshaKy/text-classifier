const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs')

global.fetch = require('node-fetch')
const port = 3000

var arr_news = [[  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
          0,   0,   0,   0,   0,   0,   0,   0,   0,  55, 363, 801]]

const app = express()

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static(path.join(publicDirPath)))

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
        const model = await tf.loadLayersModel('file://../models/sentiment/model.json')
        
        console.log('before python')

        var spawn = require("child_process").spawnSync
        var process = await spawn('python',["./../utils/preprocess-sentiment.py", req.body.test] )

        console.log(JSON.parse(process.stdout))

        var data = JSON.parse(process.stdout)

        prediciton = model.predict(tf.tensor(data)).dataSync()

        var result

        result1 = "Negative: " + ((1 - prediciton) * 100) + "%"
        result2 = "\nPositive: " + (prediciton * 100) + "%"

        result = result1 + result2

        res.render('prediction', {
            title: 'Sentiment Prediction',
            prediction: result
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

        res.render('prediction', {
            title: 'Category Prediction',
            prediction: prediciton
        })

    }

    processModel()
})

app.get('/sentiment/*', (req, res) => {
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