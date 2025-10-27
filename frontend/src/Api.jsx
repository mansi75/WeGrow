import axios from 'axios';

 // { token, user: { ... } }
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080/api",
  timeout: 8000,
});

// attach token to every request
api.interceptors.request.use((config) => {
  const t = localStorage.getItem("authToken");
  if (t) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${t}`; // MUST start with "Bearer "
  }
  return config;
});



export const getDashboard = async () => {
  const res = await api.get('/dashboard/me');
  return res.data;
};



export const login = async (username, password) => {
  const res = await api.post("/auth/login", { username, password });
  return res.data; // { token, user }
};

export const register = async ({ name, email, password }) => {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
};


export const postMood = async (mood) => {
  const res = await api.post('/moods', { userId: 1, mood });
  return res.data;
};



export default api;
