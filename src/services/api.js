const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* =========================
   TOKEN MANAGEMENT
========================= */

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
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

export function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

/* =========================
   COMMON API REQUEST
========================= */

async function apiRequest(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
  };

  // Don't manually set Content-Type for FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed with status ${response.status}`
    );
  }

  return data;
}

/* =========================
   AUTH
========================= */

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
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export function logout() {
  removeToken();
  window.location.href = "/login";
}

/* =========================
   ISSUES
========================= */

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
    formData.append(key, value);
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
  return apiRequest(`/issues/${issueId}/resolve`, {
    method: "PUT",
  });
}

export async function reopenIssue(issueId) {
  return apiRequest(`/issues/${issueId}/reopen`, {
    method: "PUT",
  });
}

/* =========================
   NOTIFICATIONS
========================= */

export async function getNotifications() {
  return apiRequest("/notifications");
}

/* =========================
   LABS
========================= */

export async function getLabs() {
  return apiRequest("/labs");
}

/* =========================
   COMPUTERS
========================= */

export async function getComputers() {
  return apiRequest("/computers");
}

/* =========================
   PROFILE
========================= */

export async function getProfile() {
  return apiRequest("/profile");
}

export async function updateProfile(profileData) {
  return apiRequest("/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
}

/* =========================
   DASHBOARD
========================= */

export async function getDashboard() {
  return apiRequest("/dashboard");
}

export { API_BASE_URL };