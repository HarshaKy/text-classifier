const tf = require('@tensorflow/tfjs-node')

async function sentimentAnalysis(req, res){
    const model = await tf.loadLayersModel('file://models/sentiment/model-v2.json')
    
    console.log('before python')

    let spawn = require("child_process").spawnSync
    let process = await spawn('python',["./utils/preprocess-sentiment-v2.py", req.body.inputText] )

    console.log(JSON.parse(process.stdout))

    let data = JSON.parse(process.stdout)

    prediciton = model.predict(tf.tensor(data)).dataSync()[0]

    let result = {
        prediciton: {
            sentiment: prediciton
        }
    }

    res.send(result)

}

module.exports = {sentimentAnalysis}