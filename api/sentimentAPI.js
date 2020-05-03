const tf = require('@tensorflow/tfjs-node')

async function sentimentAPI(req, res){
    const model = await tf.loadLayersModel('file://models/sentiment/model-v2.json')
    
    console.log('sentiment analysis api')

    let predInput = req.query.predict || req.body.inputText

    let spawn = require("child_process").spawnSync
    let process = await spawn('python',["./utils/preprocess-sentiment-v2.py", predInput] )

    console.log(JSON.parse(process.stdout))

    let data = JSON.parse(process.stdout)

    prediction = model.predict(tf.tensor(data)).dataSync()[0]

    let predText = prediction >= 0.5 ? 'Positive'  : 'Negative'

    let result = {
        prediction: {
            score: prediction,
            sentiment: predText
        }
    }

    res.send(result)

}

module.exports = {sentimentAPI}