const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const api = {
  login: (data) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  register: (data) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getIssues: () => request("/issues"),

  getIssue: (id) => request(`/issues/${id}`),

  createIssue: (data) =>
    request("/issues", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateIssue: (id, data) =>
    request(`/issues/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteIssue: (id) =>
    request(`/issues/${id}`, {
      method: "DELETE",
    }),

  getNotifications: () => request("/notifications"),

  markNotificationRead: (id) =>
    request(`/notifications/${id}/read`, {
      method: "PUT",
    }),

  getProfile: () => request("/users/profile"),

  updateProfile: (data) =>
    request("/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};