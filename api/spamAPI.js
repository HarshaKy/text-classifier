const tf = require('@tensorflow/tfjs-node')

async function spamAPI(req, res){
    const model = await tf.loadLayersModel('file://models/spam/model.json')
    
    console.log('spam api')

    let predInput = req.query.predict || req.body.inputText

    var spawn = require("child_process").spawnSync
    var process = await spawn('python',["./utils/preprocess-spam.py", predInput] )

    var data = JSON.parse(process.stdout)

    score = model.predict(tf.tensor(data)).dataSync()[0]

    let predText = score >= 0.5 ? true  : false

    let result = {
        prediction: {
            score,
            spam: predText
        }
    }

    res.send(result)

}

module.exports = {spamAPI}