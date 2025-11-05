import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosApi.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post("http://localhost:4000/api/auth/refresh-token", null, {
          withCredentials: true,
        });
        return axiosApi(originalRequest);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);
