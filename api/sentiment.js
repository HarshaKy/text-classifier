const tf = require('@tensorflow/tfjs-node')

async function sentimentAnalysis(req, res){
    const model = await tf.loadLayersModel('file://models/sentiment/model-v2.json')
    
    console.log('before python')

    var spawn = require("child_process").spawnSync
    var process = await spawn('python',["./utils/preprocess-sentiment-v2.py", req.body.test] )

    console.log(JSON.parse(process.stdout))

    var data = JSON.parse(process.stdout)

    prediciton = model.predict(tf.tensor(data)).dataSync()

    res.render('prediction', {
        title: 'SENTIMENT PREDICTION',
        prediction: prediciton
    })

}

module.exports = {sentimentAnalysis}