const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken, login } = require("../utils/auth");


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log('context -> ', context);
      
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
          }
    },

    Mutation: {

        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            console.log('token -->', token)
            console.log('user -->', user)
            return { token, user };
        },

        addPost: async (parent, args, context) => {
            if (context.user) {
              console.log('Context is in use!!');
      
              const user = await Profile.findOne({ _id: context.user._id });
      
              if (!user) {
                throw new Error('Profile not found');
              }
      
              user.posts.push(args);
              await user.save();
      
              return user;
            }
            throw new AuthenticationError('You need to be logged in!');
          },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user with this email found!');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect password!');
            }
      
            const token = signToken(user);
            return { token, user };
        }
    }
}

module.exports = resolvers;