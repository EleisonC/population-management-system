const express = require('express');
const locationRouter = express.Router();

Location = require('../models/locationModel');
const locationValidation = require('../routerMiddleware/locationValidation');

locationRouter.route('/').get((req, res) => {
  Location.find({}, (err, locations) => {
    for (const location of locations) {
      Object.assign(location, { total: location.females + location.males })
    }
    res.status(200).json(locations)
  })
}).post(locationValidation, async (req, res) => {
  let newLocation = new Location(req.body)
  newLocation.save();
  res.status(201).json(newLocation)
});

locationRouter.route("/:id/add").post(locationValidation, (req, res) => {
  const id = req.params.id;
  Location.findById(id, (error, location) => {
    error ? res.status(500).json(error) : null
    if(!!location) {
      Object.assign(req.body, {parent: location._id})
      const subLocation = new Location(req.body)
      subLocation.save()
      res.status(200).json(location)
    } else {
      res.status(404).json({message: `Location with ID ${id} does not exist`})
    }
  })
});

locationRouter.route('/:id').get( async (req, res) => {
  const { id } = req.params;
  Location.findById(id, async ( error, location) => {
    error ? res.status(500).json(error) : null
    if(!!location) {
      let response = {location}
      Location.find({parent:id}, (err, subLocations) => {
        response['subLocations'] = subLocations
        res.json(response);
      })
    } else {
      res.status(404).json({message: `Location with ID ${id} does not exist`})
    }
  })
}).put((req, res) => {
  const id = req.params.id;
  Location.findById(id, (error, location) => {
    if(!!location) {
      if(req.body._id) {
        delete req.body._id;
      }
      for (const x of Object.keys(req.body)) {
        location[x] = req.body[x]
      }
      location.save()
      res.status(200).json(location)
    } else {
      res.status(404).json({message: `Location with ID ${id} does not exist`})
    }
  })
}).delete((req, res) => {
  const id = req.params.id;
  Location.findById(id, (error, location) => {
    error ? res.status(400).json(error) : null
    if (!!location) {
      location.remove(error => {
        if (error) return res.status(400).json(error)
        res.status(200).json({message:"Location successfully removed"})
      })
    } else {
      res.status(404).json({message: `Location with ID ${id} does not exist`})
    }
  })
})

module.exports = locationRouter
