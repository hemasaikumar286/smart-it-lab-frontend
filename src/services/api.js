const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* =========================================
   TOKEN & USER MANAGEMENT
========================================= */

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getUser() {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Unable to read user:", error);
    return null;
  }
}

export function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

/* =========================================
   COMMON API REQUEST
========================================= */

async function apiRequest(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
  };

  // FormData automatically sets its own Content-Type
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        ...options,
        headers,
      }
    );

    let data = {};

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text ? { message: text } : {};
    }

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Request failed with status ${response.status}`
      );
    }

    return data;

  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

/* =========================================
   AUTHENTICATION
========================================= */

export async function login(email, password) {
  const data = await apiRequest("/auth/login", {
    method: "POST",

    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (data.token) {
    setToken(data.token);
  }

  if (data.user) {
    setUser(data.user);
  }

  return data;
}

export async function register(userData) {
  const data = await apiRequest("/auth/register", {
    method: "POST",

    body: JSON.stringify(userData),
  });

  return data;
}

export function logout() {
  removeToken();
  window.location.href = "/login";
}

/* =========================================
   ISSUES
========================================= */

export async function getIssues() {
  return apiRequest("/issues");
}

export async function getIssue(issueId) {
  return apiRequest(`/issues/${issueId}`);
}

export async function createIssue(issueData) {
  return apiRequest("/issues", {
    method: "POST",

    body: JSON.stringify(issueData),
  });
}

export async function createIssueWithAttachment(
  issueData,
  file
) {
  const formData = new FormData();

  Object.entries(issueData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  if (file) {
    formData.append("attachment", file);
  }

  return apiRequest("/issues", {
    method: "POST",
    body: formData,
  });
}

export async function updateIssueStatus(
  issueId,
  status
) {
  return apiRequest(`/issues/${issueId}/status`, {
    method: "PUT",

    body: JSON.stringify({
      status,
    }),
  });
}

export async function assignIssue(
  issueId,
  userId
) {
  return apiRequest(`/issues/${issueId}/assign`, {
    method: "PUT",

    body: JSON.stringify({
      user_id: userId,
    }),
  });
}

export async function resolveIssue(issueId) {
  return apiRequest(
    `/issues/${issueId}/resolve`,
    {
      method: "PUT",
    }
  );
}

export async function reopenIssue(issueId) {
  return apiRequest(
    `/issues/${issueId}/reopen`,
    {
      method: "PUT",
    }
  );
}

/* =========================================
   NOTIFICATIONS
========================================= */

export async function getNotifications() {
  return apiRequest("/notifications");
}

/* =========================================
   LABS
========================================= */

export async function getLabs() {
  return apiRequest("/labs");
}

/* =========================================
   COMPUTERS
========================================= */

export async function getComputers() {
  return apiRequest("/computers");
}

/* =========================================
   PROFILE
========================================= */

export async function getProfile() {
  return apiRequest("/profile");
}

export async function updateProfile(profileData) {
  return apiRequest("/profile", {
    method: "PUT",

    body: JSON.stringify(profileData),
  });
}

/* =========================================
   DASHBOARD
========================================= */

export async function getDashboard() {
  return apiRequest("/dashboard");
}

/* =========================================
   DEFAULT API OBJECT
========================================= */

const api = {
  login,
  register,
  logout,

  getToken,
  setToken,
  removeToken,

  getUser,
  setUser,

  getIssues,
  getIssue,
  createIssue,
  createIssueWithAttachment,

  updateIssueStatus,
  assignIssue,
  resolveIssue,
  reopenIssue,

  getNotifications,

  getLabs,
  getComputers,

  getProfile,
  updateProfile,

  getDashboard,
};

/* =========================================
   EXPORTS
========================================= */

// Supports:
// import api from "../services/api";
export default api;

// Supports:
// import { api } from "../services/api";
export { api, API_BASE_URL };