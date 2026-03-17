import axios from "axios";
const api = axios.create({
  baseURL: "https://shrimo.com/fake-api",
});

export const fetchPosts = () => {
  return api.get("/blog");
};

export const getPostData = async (page) => {
  const res = await api.get(`/blog?_page=${page}&_limit=5`);
  return res.data;
};

export const getIndvPostData = async (id) => {
  try {
    const res = await api.get(`/blog/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    throw new Error("Failed to fetch individual post data");
  }
};
