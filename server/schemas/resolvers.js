const { User, Comment } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user");
      }
    },
    getUsers: async () => {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch users");
      }
    },
    getComment: async (_, { id }) => {
      try {
        const comment = await Comment.findById(id);
        return comment;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user");
      }
    },
    getComments: async () => {
      try {
        console.log("anything");
        const comments = await Comment.find({});
        return comments;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch comments");
      }
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        console.log(token);
        return {
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            comments: user.comments,
          },
        };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create user");
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addComment: async (parent, { commentText }, context) => {
      console.log(context);

      if (context.user) {
        const comment = await Comment.create({
          commentText,
          commentAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { comments: comment._id } }
        );

        console.log(context.user);
        console.log(comment);
        return comment;
      }
      // throw new AuthenticationError("You need to be logged in!");
    },
    addBio: async (parent, { bioText }, context) => {
      console.log(context);

      if (context.user) {
        const bio = await User.create({
          bio: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { bio: bio._id } }
        );

        console.log(context.user);
        console.log(bio);
        return bio;

        return user;
      }

      // throw new AuthenticationError("You need to be logged in!");
    },

    updateUser: async (_, { id, username, email }) => {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          { username, email, bio },
          { new: true }
        );
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update user");
      }
    },
  },
};

module.exports = resolvers;