const express = require('express');
const routes = require('../app/routes/index')
const path = require('path')

const app = express();

module.exports = () => {
    // connect to mongo
    require('./mogoose')()

    // parse rerquests
    app.use(express.json())
    app.use(express.static(path.join(__dirname, '..','app','public')))

    // load routes
    routes(express, app)

    app.use('/', (err, req,res,next) => {
        const response = {
            success: 0,
            message: err.message
        }
        res.status(500).send(response)
    });


    return app;
}