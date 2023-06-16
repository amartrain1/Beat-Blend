const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  profilePic: {
    type: String,
    require: false,
    //do we need require?
  },
  bio: {
    type: String,
    required: false,
    max: 150,
    required: false,
    max: 150
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
      max: 200,
    }
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  const trimmedPassword = password.trim();
  return bcrypt.compare(trimmedPassword, this.password);
};

const User = model("User", userSchema);

module.exports = User;
