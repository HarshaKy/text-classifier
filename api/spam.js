const tf = require('@tensorflow/tfjs-node')

async function spamPrediction(req, res){
    const model = await tf.loadLayersModel('file://models/spam/model.json')
    
    console.log('before python')

    var spawn = require("child_process").spawnSync
    var process = await spawn('python',["./utils/preprocess-spam.py", req.body.test] )

    console.log(JSON.parse(process.stdout))

    var data = JSON.parse(process.stdout)

    prediciton = model.predict(tf.tensor(data)).dataSync()

    res.render('prediction', {
        title: 'SPAM OR HAM PREDICTION',
        prediction: prediciton
    })

}

module.exports = {spamPrediction}