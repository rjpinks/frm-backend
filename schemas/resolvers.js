const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken, login } = require("../utils/auth");


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log('context -> ', context);

      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    allUsers: async () => {
      return User.find();
    },
    oneUser: async (parent, userId) => {
      return User.findOne({ _id: userId });
    }
  },

  Mutation: {

    createUser: async (parent, args) => {
      args["posts"] = [];
      const user = await User.create(args);
      const user2 = await User.findOne({ email: args["email"] })
      const token = signToken(user2);
      console.log('token -->', token)
      console.log('user -->', user)
      if (token) { console.log("token signed", token) }
      return { token, user };
    },

    addPost: async (parent, args, context) => {
      if (context.user) {
        console.log('Context is in use!!');
        console.log("USER ->", context.user);

        const user = await User.findOne({ _id: context.user._id });
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
      console.log("login resolver triggered");
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      console.log("token signed");
      return { token, user };
    },

    updatePost: async (parent, { content, poster, postId }, context) => {
      if (context.user) {
        try {
          const query = {
            _id: context.user._id,
            'posts._id': postId
          };
    
          const update = {};
    
          // Only include non-null fields in the update object
          if (content !== "") {
            update['posts.$.content'] = content;
          }
    
          if (poster !== "") {
            update['posts.$.poster'] = poster;
          }
    
          if (Object.keys(update).length === 0) {
            throw new Error('No valid fields to update.');
          }
    
          const result = await User.updateOne(query, { $set: update });
    
          if (result.nModified === 0) {
            throw new Error('Post not found or you do not have permission to update it.');
          }
    
          return { success: true, message: 'Post updated successfully.' };
        } catch (error) {
          return { success: false, message: error.message };
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    

    removePost: async (_, { postId }, { user }) => {
      try {
        if (!user) {
          throw new Error('User not authenticated.');
        }
    
        const query = {
          _id: user._id,
          'posts._id': postId
        };
    
        const update = {
          $pull: {
            posts: { _id: postId }
          }
        };
    
        const result = await User.updateOne(query, update);
    
        if (result.nModified === 0) {
          throw new Error('Post not found or you do not have permission to delete it.');
        }
    
        const updatedUser = await User.findById(user._id);
    
        return updatedUser;
      } catch (error) {
        throw new Error(`Error removing post: ${error.message}`);
      }
    }
  }
}
module.exports = resolvers;