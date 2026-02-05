import Post from "../model/postSchema.js";
import Comment from "../model/commentSchema.js";
import jwt from "jsonwebtoken";

export async function createPost(req, res) {
    try {
        const { post } = req.body;
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, "secret");
        const imageUrl= req.file?.location;
        const newPost = new Post({ post,image:imageUrl, user:user.id });
        await newPost.save();
        res.status(201).json({ message: "Post created successfully","success":true,"imageURL":imageUrl });
    } catch (error) {
        console.log("Error creating post", error);
        res.status(500).json({ message: "Error creating post",error:error,"success":false });
    }
}

//get all posts

export async function getAllPosts(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, "secret");
        if(!user){
            return res.status(401).json({ message: "Unauthorized","success":false });
        }
        const posts = await Post.find().populate("user", "name email"); 
        res.status(200).json({ posts,"success":true });
    } catch (error) {
        console.log("Error getting posts", error);
        res.status(500).json({ message: "Error getting posts",error:error,"success":false });
    }
}
//get only user posts

export async function getUserPosts(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, "secret");
        if(!user){
            return res.status(401).json({ message: "Unauthorized","success":false });
        }
        const posts = await Post.find({ user: user.id }).populate("user", "name email");
        res.status(200).json({ posts,"success":true });
    } catch (error) {
        console.log("Error getting posts", error);
        res.status(500).json({ message: "Error getting posts",error:error,"success":false });
    }
}

//like post

export async function likePost(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, "secret");
        if(!user){
            return res.status(401).json({ message: "Unauthorized","success":false });
        }
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({ message: "Post not found","success":false });
        }
        if(post.likes.includes(user.id)){
            //remove like
            post.likes.pull(user.id);   
            await post.save();
            return res.status(200).json({ message: "Post unliked successfully","success":true });
        }
        post.likes.push(user.id);
        await post.save();
        res.status(200).json({ message: "Post liked successfully","success":true });
    } catch (error) {
        console.log("Error liking post", error);
        res.status(500).json({ message: "Error liking post",error:error,"success":false });
    }
}

//post comment

export async function postComment(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, "secret");
        if(!user){
            return res.status(401).json({ message: "Unauthorized","success":false });
        }
        const post = await Post.findById(req.params.postId);
        if(!post){
            return res.status(404).json({ message: "Post not found","success":false });
        }
        const comment = new Comment({ post: req.params.postId, user: user.id, text: req.body.comment });
        await comment.save();
        post.commentortherId.push(comment._id);
        await post.save();
        res.status(200).json({ message: "Comment posted successfully","success":true });
    } catch (error) {
        console.log("Error posting comment", error);
        res.status(500).json({ message: "Error posting comment",error:error,"success":false });
    }
} 


//get all comments

export async function getAllComments(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, "secret");
        if(!user){
            return res.status(401).json({ message: "Unauthorized","success":false });
        }
        const comments = await Comment.find({ post: req.params.postId }).populate("user", "name email");
        res.status(200).json({ comments,"success":true });
    } catch (error) {
        console.log("Error getting comments", error);
        res.status(500).json({ message: "Error getting comments",error:error,"success":false });
    }
}
