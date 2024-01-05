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

          const update = {
            $set: {
              'posts.$.content': content,
              'posts.$.poster': poster
            }
          };

          const result = await User.updateOne(query, update);

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

    removePost: async (parent, args, context, { content, postId }) => {
      return User.findByIdAndUpdate(
        context.user._id,
        { $pull: { posts: postId } }
      )
    },
  }
}
module.exports = resolvers;