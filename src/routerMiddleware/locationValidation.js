Location = require('../models/locationModel');

const locationValidation = async (req, res, next) => {
  const body = req.body

  if(!body.hasOwnProperty('name') || body.name === "") {
    return res.status(400).json({message: "Location Name Is Required Please"})
  }
  if(!body.hasOwnProperty('males') || body.males === "") {
    return res.status(400).json({message: "Number Of Males Is Required Please"})
  }
  if(!body.hasOwnProperty('females') || body.males === "") {
    return res.status(400).json({message: "Number Of Females Is Required Please"})
  }

  const existingLocation = await Location.findOne({name: req.body.name}).exec()
  if(!!existingLocation) {
    return res.status(400).json({message: `Location ${req.body.name} Already Exists`});
  }
  next()
}

module.exports = locationValidation


