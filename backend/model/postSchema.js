import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    post: {
        type: String,
    },
    image: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
    commentortherId:{
      type:Array,
      default:[]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }
});

const Post = mongoose.model("Posts", postSchema);

export default Post;