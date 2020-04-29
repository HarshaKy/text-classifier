const tf = require('@tensorflow/tfjs-node')

async function categoryAPI(req, res){
    const model = await tf.loadLayersModel('file://models/news/model.json')

    console.log('category prediciton api')

    let spawn = require("child_process").spawnSync
    let process = await spawn('python',["./utils/preprocess-news.py", req.query.predict]);

    let data = JSON.parse(process.stdout)

    prediciton = model.predict(tf.tensor(data)).dataSync()

    let result = {
        prediciton: {
            black_voices: prediciton[0], 
            business: prediciton[1], 
            comedy: prediciton[2], 
            entertainment: prediciton[3], 
            food_drink: prediciton[4], 
            healthy_living: prediciton[5], 
            home_living: prediciton[6], 
            parenting: prediciton[7], 
            parents: prediciton[8], 
            politics: prediciton[9], 
            queer_voices: prediciton[10], 
            sports: prediciton[11], 
            style_beauty: prediciton[12], 
            travel: prediciton[13], 
            wellness: prediciton[14]
        }
    }

    res.send(result)

}

module.exports = {categoryAPI}