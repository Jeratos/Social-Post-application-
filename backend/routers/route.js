import express from "express";
import { registerUser, loginUser } from "../controller/user-controller.js";
import { createPost,getAllPosts,likePost,getUserPosts,postComment,getAllComments } from "../controller/post-controller.js";
import {upload} from "../utilities/imageUpload.js";
const router = express.Router();

router.route("/").get((req,res)=>{
    res.send("Hello World!");
})

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/createPost").post(upload.single("image"),createPost);
router.route("/getAllPosts").get(getAllPosts);
router.route("/getUserPosts").get(getUserPosts);
router.route("/likePost/:id").post(likePost);
router.route("/postComment/:postId").post(postComment);

router.route("/getAllComments/:postId").get(getAllComments);

export default router;