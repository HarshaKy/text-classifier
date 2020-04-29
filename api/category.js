const tf = require('@tensorflow/tfjs-node')

async function categoryPrediction(req, res){
    const model = await tf.loadLayersModel('file://models/news/model.json')

    var spawn = require("child_process").spawnSync
    var process = await spawn('python',["./utils/preprocess-news.py", req.body.test]);

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
        title: 'CATEGORY PREDICTION',
        prediction: JSON.stringify(arr)
    })

}

module.exports = {categoryPrediction}