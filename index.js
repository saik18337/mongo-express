const express = require('./config/express')

const app = express();

app.listen(3000, () => {
    console.log('App Started')
})