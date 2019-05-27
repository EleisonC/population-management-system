const mongoose = require('mongoose');
const schema = mongoose.Schema;

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

modules.exports = mongoose.model('locations', locationSchema)
