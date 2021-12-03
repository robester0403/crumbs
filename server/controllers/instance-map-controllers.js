const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require("uuid");
const HttpError = require('../models/http-error');
const Instance = require('../models/instance');
const Marker = require('../models/marker');
const mongoose = require('mongoose');

// this is a get all for demo purposes
const getAllInstances = async (req, res, next) => {
  let instances;
  try {
    // check why we need the option in documentation
    instances = await Instance.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ instances: instances.map(instance => instance.toObject({ getters: true })) });
};

const getAllMapMarkers = async (req, res, next) => {
  let markers;
  try {
    // check why we need the option in documentation
    markers = await Marker.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ markers: markers.map(marker => marker.toObject({ getters: true })) });
};

// or we search something like this req.userData.userId. I can send something back through the body right?
const getBizIdInstances = async (req, res, next) => {
  const bizId = req.params.bizid;

let bizInstances;
try {
  // do I need string interpolation here? for bizId
  bizInstances = await Instance.find({bizId: bizId}).populate('instances');
} catch (err) {
  const error = new HttpError(
    'Something went wrong, could not find an instance.',
    500
  );
  return next(error);
}

if (!bizInstances || bizInstances.instances.length === 0) {
  const error = new HttpError(
    'Could not find instance for the provided bizId. Check if there is an instance',
    404
  );
  return next(error);
}
res.json({
    places: bizInstances.instances.map(instance =>
      instance.toObject({ getters: true })
    )
  });
};



exports.getAllInstances = getAllInstances;
exports.getAllMapMarkers = getAllMapMarkers;
exports.getBizIdInstances = getBizIdInstances;