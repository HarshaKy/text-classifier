const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs')

global.fetch = require('node-fetch')
const port = 3000

var arr_news = [[ 9632, 35389,  2300,   765,   272,   761,   187,     2,  2398,
    1274,   802,   254,   212,  1959,   118,   187,   680,    73,
     581, 35388, 35388, 35388, 35388, 35388, 35388]]

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
        
        var spawn = require("child_process").spawn;
        var process = await spawn('python',["./../utils/preprocess-sentiment.py", req.body.test] );

        await process.stdout.on('data', function(data) { 

            var data = JSON.parse(data)

            // console.log(data)

            prediciton = model.predict(tf.tensor(data)).dataSync()[0]

            // console.log(typeof data)
            // console.log(prediciton)

            var verdict

            if (prediciton > 0.5) {
                verdict = "Positive"
            } else {
                verdict = "Negative"
            }

            res.render('prediction', {
                title: 'Sentiment Prediction',
                prediction: verdict
            })
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
    // res.send(req.body.test)
    async function processModel(){
        const model = await tf.loadLayersModel('file://models/news/model.json')
        prediciton = model.predict(tf.tensor(arr_news)).dataSync()
        // res.send(`${prediciton}`)

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