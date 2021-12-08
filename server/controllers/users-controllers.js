const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
const User = require('../models/user');
const Influencer = require('../models/influencer');
const mongoose = require('mongoose');
const Marker = require('../models/marker');
const Instance = require('../models/instance');
const axios = require('axios');

// Login and sign up control
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password'); //this is the find funci
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    // next is just passing the HttpError that we want to tell the user
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
// destructure data for doing this
  const { name, email, password } = req.body;
// see if database actually works
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
// find if the user already exists
  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

// This is where it interacts with the model schema to create a new user database
  const createdUser = new User({
    name,
    email,
    password: hashedPassword
  });

createdUser._id
// See if we can save
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  const createdInfluencer = new Influencer({
    name,
    email,
    userId: createdUser._id.valueOf()
  });
// See if we can save
  try {
    await createdInfluencer.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      'supersecret_dont_share',
      { expiresIn: '2h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
// try to find a email
  try {
    existingUser = await User.findOne({ email: email });
  } 
// if you can't find a email
    catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }
// error for no existing User
  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }
// we now use bcrypt to compare entered passwords
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }
// Here is the crown jewel where the token is handed over
  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token
  });
};

// setSomeState(res.data.instances) is the adaptor
const influencerDBGetOwnInstances = async (req, res, next) => {
  const userId = await req.params.userId;

  let ownInstances;
  try {
    ownInstances = await Instance.find({ userId:userId });
    } catch (err) {
      const error = new HttpError(
        'Fetching instances error.',
        500
      );
      return next(error);
    }
    
      if (!ownInstances) {
        return next(
          new HttpError('Could not find places for the provided user id.', 404)
        );
      }

    res.json({
      instances: ownInstances.map(instance =>
        instance.toObject({ getters: true })
      )
    });
}

const influencerDBAddMarkerInstance = async (req, res, next) => {
  const errors = validationResult(req);
  // stop here if errors in req
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { 
      bizId,
      bizName,
      imageUrl,
      address1,
      address2,
      address3,
      city,
      country,
      state,
      phone,
      latitude,
      longitude,
      userId,
      name,
      mediaLinkUrl,
      mediaEmbed,
      price,
      rating,
      url,
      reviewCount,
  } = req.body;

  let existingMarker = await Marker.findOne({ bizId: bizId });
  const createdMarker = new Marker({
    bizId,
    bizName,
    imageUrl,
    address1,
    address2,
    address3,
    city,
    country,
    state,
    phone,
    latitude,
    longitude,
    price,
    rating,
    url,
    reviewCount,
  });

  if (!existingMarker) {
    try {
      createdMarker.save();
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
  }

// ===== code up to here is working
    let existingInstance;
    try {
      existingInstance = await Instance.findOne({ bizId: bizId, userId: userId });
    } catch (err) {
      const error = new HttpError(
        'Add Instance failed.',
        500
      );
      return next(error);
    }
  
    if (existingInstance) {
      const error = new HttpError(
        'Instance for this location exists already, please update your instance instead.',
        422
      );
      return next(error);
    }
  
    const createdInstance = new Instance({
      bizId,
      bizName,
      userId,
      name,
      address1,
      address2,
      address3,
      city,
      country,
      state,
      mediaLinkUrl,
      mediaEmbed,
      phone
    });
  
    try {
      await createdInstance.save();
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
  // this is just a object we send back to the front as confirmation. Don't know if we need it.
    res.status(201).json({ instance: createdInstance });
  }

const influencerSearchYelp = async (req, res, next) => {
  const { 
    term,
    location
  } = req.body;

  const queryterm = `term=` + `${term}`
  const querylocation = `location=` + `${location}`

  await axios.get(
    `https://api.yelp.com/v3/businesses/search?${queryterm}&${querylocation}&limit=1`,
      {
        headers: 
        { 'Authorization': 'Bearer ' + process.env.YELP_URI }
      }
    )
    .then((response) => {
      console.log(response.data.businesses[0].image_url)
      res.send({
        bizId: response.data.businesses[0].id,
        bizName: response.data.businesses[0].name,
        imageUrl: response.data.businesses[0].image_url,
        address1: response.data.businesses[0].location.address1,
        address2: response.data.businesses[0].location.address2,
        address3: response.data.businesses[0].location.address3,
        city: response.data.businesses[0].location.city,
        country: response.data.businesses[0].location.country,
        state: response.data.businesses[0].location.state,
        phone: response.data.businesses[0].display_phone,
        latitude: response.data.businesses[0].coordinates.latitude,
        longitude: response.data.businesses[0].coordinates.longitude,
        price: response.data.businesses[0].price,
        rating: response.data.businesses[0].rating,
        url: response.data.businesses[0].url,
        reviewCount: response.data.businesses[0].review_count
      })
    })
    .catch((err) => {
      console.log('failed to grab user devices');
    });
    
}


const influencerDBGetProfile = async (req, res, next) => {
  const influencerId = await req.params.userId;

  let profileData;
  try {
    profileData = await Influencer.findOne({ userId:influencerId });
      } catch (err) {
        const error = new HttpError(
          'Fetching instances error.',
          500
        );
        return next(error);
      }
    
      if (!profileData) {
        return next(
          new HttpError('Could not find places for the provided user id.', 404)
        );
      }

    res.json({ profileData: profileData.toObject({ getters: true }) })
}
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.influencerDBGetOwnInstances = influencerDBGetOwnInstances;
exports.influencerDBGetProfile = influencerDBGetProfile;
exports.influencerSearchYelp = influencerSearchYelp;
exports.influencerDBAddMarkerInstance = influencerDBAddMarkerInstance;
