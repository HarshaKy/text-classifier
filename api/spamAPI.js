const tf = require('@tensorflow/tfjs-node')

async function spamAPI(req, res){
    const model = await tf.loadLayersModel('file://models/spam/model.json')
    
    console.log('spam api')

    var spawn = require("child_process").spawnSync
    var process = await spawn('python',["./utils/preprocess-spam.py", req.query.predict] )

    console.log(JSON.parse(process.stdout))

    var data = JSON.parse(process.stdout)

    prediciton = model.predict(tf.tensor(data)).dataSync()[0]

    let result = {
        prediciton: {
            spam: prediciton
        }
    }

    res.send(result)

}

module.exports = {spamAPI}