const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const tf = require('@tensorflow/tfjs-node');

global.fetch = require('node-fetch')
const port = 3000

var arr = [[   0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0, 1632, 1993,  328,   11, 2470,   44,    4,   84, 5602,   17,
   15,  126,  760,   42, 1080, 1487,   63,  196,   13,  182,  495,
  650,   63,   16,   74,   33,  242, 2161,   57,    1,  105, 2255,
  977,   86, 1736,   41,   55,   41,  119,   14,  285,  146,  563,
 1509, 1088,   32,   12,  149,  121, 2990, 4172,    1,    4,  990,
  863, 1354, 5628,   30,  441,  172, 1597,   80, 1138, 2707,  495,
 2483, 1839,  208, 4151,   24,   42, 2081,   31,   17]]

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

app.post('/predict', (req, res) => {
    res.send(req.body.test)
    // async function processModel(){
    //     const model = await tf.loadLayersModel('file://models/sentiment/model.json')
    //     prediciton = model.predict(tf.tensor(arr)).dataSync()[0]
    //     res.send(`${prediciton}`)
    // }

    // processModel()
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