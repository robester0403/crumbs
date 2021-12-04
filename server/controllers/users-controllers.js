const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
const User = require('../models/user');
const Influencer = require('../models/influencer');
const mongoose = require('mongoose');
const Marker = require('../models/marker');
const Instance = require('../models/instance');



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

// this is not done yet complete saturday
const influencerDBGetOwnInstances = async (req, res, next) => {
  let userId = req.params.userId;
  userId = mongoose.Types.ObjectId(userId)
  console.log(typeof(userId))

  try {
    let influencerProfile = await Influencer.find({ userId: userId});
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

const influencerDBAddMarker = async (req, res, next) => {
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
      longitude
  } = req.body;
// if marker is not found {
//   create marker
// } 
// let test = await Marker.findOne({ bizId: bizId })
// if (!test)
  // change this to an if statement so that if. An empyt object is true
  let existingMarker;
  try {
    existingMarker = await Marker.findOne({ bizId: bizId });
  } catch (err) {
    const error = new HttpError(
      'Add Marker failed.',
      500
    );
    return next(error);
  }
// if marker exists
  if (existingMarker) {
    const error = new HttpError(
      'Marker exists already, please add your instance instead.',
      422
    );
    return next(error);
  }

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
    longitude
  });

  try {
    await createdMarker.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
// this is just a object we send back to the front as confirmation. Don't know if we need it.
  res.status(201).json({ marker: createdMarker });
};


const influencerDBAddInstance = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { 
    bizId,
    bizName,
    userId,
    name,
    address1,
    city,
    country,
    state,
    mediaLinkUrl,
    mediaEmbed,
    phone
  } = req.body;

  let existingInstance;
  try {
    existingInstance = await Instance.findOne({ bizId: bizId });
  } catch (err) {
    const error = new HttpError(
      'Add Instance failed.',
      500
    );
    return next(error);
  }

  if (existingInstance) {
    const error = new HttpError(
      'Instance exists already, please add your instance instead.',
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
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.influencerDBGetOwnInstances = influencerDBGetOwnInstances;

exports.influencerDBAddMarker = influencerDBAddMarker;
exports.influencerDBAddInstance = influencerDBAddInstance;



// const influencerDBAddMarker = async (req, res, next) => {
//   const errors = validationResult(req);
//   // stop here if errors in req
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError('Invalid inputs passed, please check your data.', 422)
//     );
//   }

//   const { 
//       bizId,
//       bizName,
//       imageUrl,
//       address1,
//       address2,
//       address3,
//       city,
//       country,
//       state,
//       phone,
//       latitude,
//       longitude,
//       userId,
//       name,
//       mediaLinkUrl,
//       mediaEmbed
//   } = req.body;
// // if marker is not found {
// //   create marker
// // } 
// // let test = await Marker.findOne({ bizId: bizId })
// // if (!test)
//   // change this to an if statement so that if. An empyt object is true
// // existingMarker is the document that exists
//   let existingMarker = Marker.findOne({ bizId: bizId });
//   if (!existingMarker) {
//     const createdMarker = new Marker({
//       bizId,
//       bizName,
//       imageUrl,
//       address1,
//       address2,
//       address3,
//       city,
//       country,
//       state,
//       phone,
//       latitude,
//       longitude
//     });
  
//     try {
//       await createdMarker.save();
//     } catch (err) {
//       const error = new HttpError(
//         'Signing up failed, please try again later.',
//         500
//       );
//       return next(error);
//     }    

//     let existingInstance;
//     try {
//       existingInstance = await Instance.findOne({ bizId: bizId, userId: userId });
//     } catch (err) {
//       const error = new HttpError(
//         'Add Instance failed.',
//         500
//       );
//       return next(error);
//     }
  
//     if (existingInstance) {
//       const error = new HttpError(
//         'Instance exists already, please add your instance instead.',
//         422
//       );
//       return next(error);
//     }
  
//     const createdInstance = new Instance({
//       bizId,
//       bizName,
//       userId,
//       name,
//       address1,
//       city,
//       country,
//       state,
//       mediaLinkUrl,
//       mediaEmbed,
//       phone
//     });
  
//     try {
//       await createdInstance.save();
//     } catch (err) {
//       const error = new HttpError(
//         'Signing up failed, please try again later.',
//         500
//       );
//       return next(error);
//     }
//   // this is just a object we send back to the front as confirmation. Don't know if we need it.
//     res.status(201).json({ instance: createdInstance });
//   }


// };

// const influencerDBAddInstance = async (req, res, next) => {


// };