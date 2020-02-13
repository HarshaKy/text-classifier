const tf = require('@tensorflow/tfjs-node');
global.fetch = require('node-fetch')

var arr = [[   0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0, 1632, 1993,  328,   11, 2470,   44,    4,   84, 5602,   17,
   15,  126,  760,   42, 1080, 1487,   63,  196,   13,  182,  495,
  650,   63,   16,   74,   33,  242, 2161,   57,    1,  105, 2255,
  977,   86, 1736,   41,   55,   41,  119,   14,  285,  146,  563,
 1509, 1088,   32,   12,  149,  121, 2990, 4172,    1,    4,  990,
  863, 1354, 5628,   30,  441,  172, 1597,   80, 1138, 2707,  495,
 2483, 1839,  208, 4151,   24,   42, 2081,   31,   17]]

async function processModel(){
    const model = await tf.loadLayersModel('file://models/sentiment/model.json')
    prediciton = model.predict(tf.tensor(arr)).dataSync()[0]
    console.log(prediciton)
}

processModel();



console.log('end')

// asdf()