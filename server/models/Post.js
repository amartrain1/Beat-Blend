const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const postSchema = new Schema ({
    postText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
        trim: true,
    },
    postAuthor: {
        type: String,
        required: true,
        trim: true,
        // type: Schema.Types.ObjectId,
        // ref: "User"
    },
    postAudio: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

const Post = model("Post", postSchema);

module.exports = Post;