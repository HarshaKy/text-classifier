const tf = require('@tensorflow/tfjs-node');

async function asdf() {
    const model = await tf.loadLayersModel('models/sentiment/model.json')
    const prediciton = model.predict("stuff go moment mj ive start listen music watc")
    console.log("asdf")
}