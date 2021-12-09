const { constants } = require('../constants/index');
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


exports.authenticateUser = (req, res, next) => {
    const authHeader = req.header('authorization');
    if(!authHeader) {
        throw new Error('Authentication Missing')
    }
    const jwt = require('jsonwebtoken')
    const data = jwt.verify(authHeader, constants.JWT_SECRETE)
    if(data) {
        req.auth = data;
        next();
    }
    else {
        throw new Error('Invalid Token')
    }
}