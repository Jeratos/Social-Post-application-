/* eslint-disable react-hooks/immutability */
import React, { useRef, useState, useEffect } from "react";
import {
  Form,
  Button,
  Accordion,
  Card,
  ListGroup,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCont } from "../../context/Context";
import {
  createPost,
  getAllPosts,
  getAllComments,
  likePost,
  postComment,
  getUserPosts,
} from "../../service/PostService";
import { FaHeart, FaComment } from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Comment {
  _id: string;
  text: string;
  user: User;
}

interface PostData {
  _id: string;
  post: string;
  image?: string;
  user: User;
  likes: string[];
  comments?: Comment[];
}

export default function Post() {
  const { LogoutUser } = useCont();
  const navigate = useNavigate();
  const [showMyPosts, setShowMyPosts] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<{ post: string; image: File | null }>({
    post: "",
    image: null,
  });
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [visibleComments, setVisibleComments] = useState<{
    [key: string]: boolean;
  }>({});
  const [postComments, setPostComments] = useState<{
    [postId: string]: Comment[];
  }>({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      if (showMyPosts) {
        const data = await getUserPosts();
        if (data.success) {
          setPosts(data.posts);
        } else {
          toast.error(data.message);
        }
      } else {
        const data = await getAllPosts();
        if (data.success) {
          setPosts(data.posts);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const files = (e.target as HTMLInputElement).files;

    if (name === "image" && files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("post", form.post);
      if (form.image) {
        formData.append("image", form.image);
      }

      const data = await createPost(formData);

      if (data.success == true) {
        setForm({ post: "", image: null });
        toast.success("Post created successfully");
        fetchPosts(); // Refresh posts
      } else if (
        data.success == false &&
        data.error?.message == "jwt expired"
      ) {
        navigate("/login");
        toast.error("your session is expired Please login first");
        LogoutUser();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post");
    }
  };

  const handleLike = async (id: string) => {
    try {
      const data = await likePost(id);
      if (data.success) {
        // Optimistic update or refresh
        fetchPosts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const handleCommentChange = (postId: string, value: string) => {
    setCommentText((prev) => ({ ...prev, [postId]: value }));
  };

  const submitComment = async (postId: string) => {
    if (!commentText[postId]) return;
    try {
      const data = await postComment(postId, commentText[postId]);
      if (data.success) {
        setCommentText((prev) => ({ ...prev, [postId]: "" }));
        fetchComments(postId); // Refresh comments for this post if open
        toast.success("Comment added");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("error submitting comment", error);
    }
  };

  const toggleComments = async (postId: string) => {
    setVisibleComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    if (!visibleComments[postId] && !postComments[postId]) {
      fetchComments(postId);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      const data = await getAllComments(postId);
      if (data.success) {
        setPostComments((prev) => ({ ...prev, [postId]: data.comments }));
      }
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  };

  return (
    <div className="container mt-4">
      <Accordion className="mb-4 w-50 mx-auto">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Send your post</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="d-flex flex-column gap-2">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={form.post}
                  onChange={handleChange}
                  name="post"
                  placeholder="Enter your post"
                />
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-secondary"
                    onClick={() => fileRef.current?.click()}
                  >
                    Upload Image
                  </Button>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    ref={fileRef}
                    style={{ display: "none" }}
                  />
                </div>
                {form.image && <span>{form.image.name}</span>}

                <Button type="submit">Post</Button>
              </Form.Group>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="w-50 mx-auto">
        <Button
          className="mb-4 w-100"
          onClick={() => (setShowMyPosts(!showMyPosts), fetchPosts())}
        >
          show My Posts
        </Button>
      </div>

      <div className="d-flex flex-column gap-3 w-50 mx-auto">
        {posts.map((post) => {
          return (
            <Card key={post._id} className="shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <Card.Title>{post.user?.name || "Unknown User"}</Card.Title>
                  <small className="text-muted">
                    {new Date(Date.now()).toDateString()}
                  </small>{" "}
                  {/* Use actual date if available */}
                </div>

                <Card.Text>{post.post}</Card.Text>
                {post.image && (
                  <Card.Img
                    variant="top"
                    src={post.image}
                    className="mb-3"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                )}

                <div className="d-flex gap-3 align-items-center">
                  <Button
                    variant="link"
                    className="text-decoration-none p-0"
                    onClick={() => handleLike(post._id)}
                  >
                    {/* Note: In a real app we need to check if current user liked the post to toggle icon filled/outlined. 
                                 Backend schema shows likes is array of user IDs. 
                             */}
                    <FaHeart color="red" /> {post.likes.length} Likes
                  </Button>
                  <Button
                    variant="link"
                    className="text-decoration-none p-0"
                    onClick={() => toggleComments(post._id)}
                  >
                    <FaComment /> Comments
                  </Button>
                </div>
              </Card.Body>
              {visibleComments[post._id] && (
                <Card.Footer>
                  <ListGroup variant="flush" className="mb-3">
                    {postComments[post._id]?.map((comment) => (
                      <ListGroup.Item key={comment._id}>
                        <strong>{comment.user?.name}: </strong> {comment.text}
                      </ListGroup.Item>
                    ))}
                    {(!postComments[post._id] ||
                      postComments[post._id].length === 0) && (
                      <p className="text-center text-muted mt-2">
                        No comments yet
                      </p>
                    )}
                  </ListGroup>
                  <InputGroup>
                    <Form.Control
                      placeholder="Add a comment..."
                      value={commentText[post._id] || ""}
                      onChange={(e) =>
                        handleCommentChange(post._id, e.target.value)
                      }
                    />
                    <Button
                      variant="outline-primary"
                      onClick={() => submitComment(post._id)}
                    >
                      Send
                    </Button>
                  </InputGroup>
                </Card.Footer>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
