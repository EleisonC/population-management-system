const express = require('express')
const mongoose = require('mongoose');
const {PORT,MLAB_URI} = process.env
const bodyParser = require('body-parser');
const morgan = require('morgan')

const app = express();
const db = mongoose.connect(MLAB_URI, { useNewUrlParser: true });

app.use(morgan('combined'))
app.use(bodyParser.json())


app.listen(4000, () => {
  console.log('Application running on port 4000...')
})

module.exports = app
