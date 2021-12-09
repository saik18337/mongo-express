const mongoose = require('mongoose');

const {connection} = mongoose

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/mongostore');
    connection.on('open', (obj) => {
        console.log('Mongo connected', obj)
    })
    connection.on('error', (err) => {
        console.log('Error while connecting', err)
    })
    return { mongoose };
}