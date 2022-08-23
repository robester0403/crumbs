const HttpError = require("../models/http-error");
const Instance = require("../models/instance");
const Marker = require("../models/marker");

// this is a get all for demo purposes
const getAllInstances = async (req, res, next) => {
  let allInstances;
  try {
    allInstances = await Instance.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    instances: allInstances.map((instance) =>
      instance.toObject({ getters: true })
    ),
  });
};

const getAllMapMarkers = async (req, res, next) => {
  let allMarkers;
  try {
    allMarkers = await Marker.find({});
  } catch (err) {
    return next(
      new HttpError("Fetching users failed, please try again later.", 500)
    );
  }
  res.json({
    markers: allMarkers.map((marker) => marker.toObject({ getters: true })),
  });
};

const getBizIdInstances = async (req, res, next) => {
  const bizId = req.params.bizId;

  let bizInstances;
  try {
    // do I need string interpolation here? for bizId
    bizInstances = await Instance.find({ bizId: bizId });
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find an instance.", 500)
    );
  }
  if (!bizInstances) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }
  res.json({
    instances: bizInstances.map((instance) =>
      instance.toObject({ getters: true })
    ),
  });
};

exports.getAllInstances = getAllInstances;
exports.getAllMapMarkers = getAllMapMarkers;
exports.getBizIdInstances = getBizIdInstances;
