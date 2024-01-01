const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const secret = 'charlie-is-cool';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;
  },

  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  login: async function (parent, { email, password }) {
    // Assuming you have a User model or a way to authenticate users
    const User = require('../models/User');

    // Find the user based on the provided email
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Validate the password
    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Generate a token
    const token = this.signToken({ email: user.email, username: user.username, _id: user._id });

    // Return the token as the login result
    return { token };
  },
};
