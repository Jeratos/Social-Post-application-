import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
text: {
    type: String,
    required: true
},
post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts"
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
}    
})

const Comment = mongoose.model("Comments", commentSchema)

export default Comment
