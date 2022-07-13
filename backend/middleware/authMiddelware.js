const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from req.header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the user
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.statusCode(401).send(error);
    }

    if (!token) {
      res.statusCode(401);
      throw new Error('not authorized, no token');
    }
  }
});

module.exports = { protect };
