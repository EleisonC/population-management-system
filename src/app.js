const express = require('express')
const mongoose = require('mongoose');
const locationRouter = require('./routers/locationRoutes');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const app = express();
const db = mongoose.connect("mongodb+srv://chris:r5-GRrS8UsuC_uw@ka7u73-23xdq.mongodb.net/population-management?retryWrites=true", { useNewUrlParser: true });

app.use(morgan('combined'))
app.use(bodyParser.json())

app.use('/api/locations', locationRouter)

app.listen(4000, () => {
  console.log('Application running on port 4000...')
})

module.exports = app
