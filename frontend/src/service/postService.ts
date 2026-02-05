const API_URL = "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("Token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

const getAuthHeadersMultipart = () => {
  const token = localStorage.getItem("Token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const createPost = async (formData: FormData) => {
  const response = await fetch(`${API_URL}/createPost`, {
    method: "POST",
    headers: getAuthHeadersMultipart(),
    body: formData,
  });
  return response.json();
};

export const getAllPosts = async () => {
  const response = await fetch(`${API_URL}/getAllPosts`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const getUserPosts = async () => {
  const response = await fetch(`${API_URL}/getUserPosts`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const likePost = async (id: string) => {
  const response = await fetch(`${API_URL}/likePost/${id}`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const postComment = async (postId: string, comment: string) => {
  const response = await fetch(`${API_URL}/postComment/${postId}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ comment }),
  });
  return response.json();
};

export const getAllComments = async (postId: string) => {
  const response = await fetch(`${API_URL}/getAllComments/${postId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return response.json();
};
