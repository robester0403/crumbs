const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require("uuid");
const HttpError = require('../models/http-error');
const User = require('../models/user');
const Influencer = require('../models/influencer');
const mongoose = require('mongoose')




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


  let generatedId=uuidv4()
// This is where it interacts with the model schema to create a new user database
  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    influencerId: generatedId
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
    userId: createdUser._id
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


const influencerDashBoardGetData = async (req, res, next) => {
  let userId = req.params.userId;
  userId = mongoose.Types.ObjectId(userId)
  console.log(typeof(userId))

  try {
    let influencerProfile = await Influencer.findOne({ userId: userId});
    if (!influencerProfile) {
      const error = new HttpError(
        'Could not find your profile.',
        404
      );
      return next(error);
    }
    res.json({ influencerProfile: influencerProfile.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find the Influencer.',
      500
    );
    return next(error);
  }



}


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.influencerDashBoardGetData = influencerDashBoardGetData;