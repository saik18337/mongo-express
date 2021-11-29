const fs = require('fs')
exports.loadController = (controller) => {
    const file = './app/controllers/'+controller+'.js'
    const module = '../controllers/'+controller+'.js'
    const fileExists = fs.existsSync(file);
    console.log(fileExists, file)
    if(!fileExists) {
        throw new Error('Controller not found')
    }
    const Controller = require(module);
    return new Controller();
}


exports.loadModel = (model) => {
    const file = './app/models/'+model+'.js'
    const module = '../models/'+model+'.js'
    const fileExists = fs.existsSync(file);
    console.log(fileExists, file)
    if(!fileExists) {
        throw new Error('Model not found')
    }
    const Model = require(module);
    return Model;
}