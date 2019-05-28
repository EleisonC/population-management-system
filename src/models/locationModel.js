const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema ({
  name: { 
    type: String,
    required: true
  },
  males: { 
    type: Number,
    required: true
  },
  females: { 
    type: Number,
    required: true
  },
  parent: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'locations' 
  }
})

const Location = module.exports = mongoose.model('locations', locationSchema)
