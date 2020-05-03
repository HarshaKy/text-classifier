const tf = require('@tensorflow/tfjs-node')

async function categoryAPI(req, res){
    const model = await tf.loadLayersModel('file://models/news/model.json')

    console.log('category prediction api')

    let predInput = req.query.predict || req.body.inputText

    let spawn = require("child_process").spawnSync
    let process = await spawn('python',["./utils/preprocess-news.py", predInput]);

    let data = JSON.parse(process.stdout)

    prediction = model.predict(tf.tensor(data)).dataSync()

    score = {
        black_voices: prediction[0], 
        business: prediction[1], 
        comedy: prediction[2], 
        entertainment: prediction[3], 
        food_drink: prediction[4], 
        healthy_living: prediction[5], 
        home_living: prediction[6], 
        parenting: prediction[7], 
        parents: prediction[8], 
        politics: prediction[9], 
        queer_voices: prediction[10], 
        sports: prediction[11], 
        style_beauty: prediction[12], 
        travel: prediction[13], 
        wellness: prediction[14]
    }
    
    prediction.sort()

    let verdict = prediction[14]
    
    let result = {
        score: score,
        verdict: verdict
    }

    console.log(result.verdict)

    res.send(result)

}

module.exports = {categoryAPI}