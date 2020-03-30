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

        var spawn = require("child_process").spawnSync
        var process = await spawn('python',["./../utils/preprocess-news.py", req.body.test]);

        var data = JSON.parse(process.stdout)

        prediciton = model.predict(tf.tensor(data)).dataSync()

        var arr = {
            "Black Voices": prediciton[0], 
            "Business ": prediciton[1], 
            "Comedy ": prediciton[2], 
            "Entertainment ": prediciton[3], 
            "Food and Drink": prediciton[4], 
            "Healthy Living": prediciton[5], 
            "Home Living": prediciton[6], 
            "Parenting ": prediciton[7], 
            "Parents ": prediciton[8], 
            "Politics ": prediciton[9], 
            "Queer Voices": prediciton[10], 
            "Sports ": prediciton[11], 
            "Style and Beauty": prediciton[12], 
            "Travel ": prediciton[13], 
            "Wellness ": prediciton[14]
        }

        console.log(arr)

        res.render('prediction', {
            title: 'Category Prediction',
            prediction: JSON.stringify(arr)
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