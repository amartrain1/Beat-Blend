const { User, Comment, Post } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id).populate("posts");
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user");
      }
    },
    getUsers: async () => {
      try {
        const users = await User.find({}).populate("posts");
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
    getPost: async (_, { id }) => {
      try {
        const post = await Post.findById(id);
        return post;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch post");
      }
    },
    getPosts: async (_parent, args) => {
      try {
        const posts = await Post.find({}).sort({ createdAt: -1  });
        return posts;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch posts");
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
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { bio: bioText },
          { new: true }
        );
        return user;
      }
      // throw new AuthenticationError("You need to be logged in!");
    },
    updateUser: async (_, { id, name, username, email, bio }) => {
      try {
        console.log("Received request to update user", id); //! REMOVE
        console.log("Updated values:", name, username, email, bio); //! REMOVE
        const user = await User.findByIdAndUpdate(
          id,
          { username, email, bio, name },
          { new: true }
        );
        console.log("Updated user:", user); //! REMOVE
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update user");
      }
    },
    addPost: async (parent, { postText, postAudio }, context) => {
      console.log(context);
      if (context.user) {
        const post = await Post.create({
          postText,
          postAudio,
          postAuthor: context.user.username,
        });

        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { posts: post._id } },
          { new: true }
        );
        return post;
      }
    },
  },
};

module.exports = resolvers;
