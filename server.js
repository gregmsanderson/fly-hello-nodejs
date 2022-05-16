'use strict';

const port = process.env.PORT || 3000

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, '::', () =>
    console.log(`Listening on port ${port}`)
)