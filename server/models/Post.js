const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const postSchema = new Schema ({
    postText: {
        type: String,
        required: true,
        maxlength: 200
    },
    postAuthor: {
        type: String,
        required: true
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