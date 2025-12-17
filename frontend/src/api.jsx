import axios from 'axios';

 
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "/api",
  timeout: 8000,
});


api.interceptors.request.use((config) => {
  const t = localStorage.getItem("authToken");
  if (t) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${t}`; 
  }
  return config;
});



export const getDashboard = async () => {
  const res = await api.get('/dashboard/me');
  return res.data;
};



export const login = async (username, password) => {
  const res = await api.post("/auth/login", { username, password });
  return res.data; 
};

export const register = async ({ name, email, password }) => {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
};


export const postMood = async (mood) => {
  const res = await api.post('/moods', { userId: 1, mood });
  return res.data;
};

 export async function createJournalEntry({ content, tags = [], file }) {
  const fd = new FormData();
  fd.append("content", content ?? "");
  fd.append("tags", JSON.stringify(tags));
  if (file) fd.append("image", file);

  const res = await api.post("/journal", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data; 
}

export const getProfile = async () => {
  const res = await api.get("/profile/me");
  return res.data;
};

export const updateProfile = async (payload) => {
  const res = await api.put("/profile/me", payload);
  return res.data;
};

export async function getMyJournalEntries(limit = 20) {
  const res = await api.get(`/journal/me?limit=${limit}`);
  return res.data; 
}

export const recordActivity = async (type) => {
  
  await api.post("/sessions/activity", { type });
};




export const getCommunityPosts = async (category = "ALL") => {
  const params =
    !category || category === "ALL" ? {} : { category: category.toUpperCase() };

  const res = await api.get("/community/posts", { params });
  return res.data; 
};

export const createCommunityPost = async ({ content, category }) => {
  const body = {
    content,
    category: category && category !== "ALL" ? category.toUpperCase() : "GENERAL",
  };
  const res = await api.post("/community/posts", body);
  return res.data; 
};




export default api;
