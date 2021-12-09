const express = require('express');
const routes = require('../app/routes/index')
const path = require('path')

const app = express();

module.exports = () => {
    // connect to mongo
    const {mongoose} = require('./mogoose')()

    // parse rerquests
    app.use(express.json())
    app.use(express.static(path.join(__dirname, '..','app','public')))

    // load routes
    routes(express, app)

    app.use('/', (err, req,res,next) => {
        let error = err.message;
        let messages = {};
        for(i in err.errors) {
            messages[i] = err.errors[i].message
        }
        const response = {
            success: 0,
            message: err.message,
            validations: messages
        }
        res.status(500).send(response)
    });


    return app;
}