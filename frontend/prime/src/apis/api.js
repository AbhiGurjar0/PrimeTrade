
const API_URL = "http://localhost:3000";

export const api = {
  register: async (data) => {
    return fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
  },

  login: async (data) => {
    return fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
  },

  getTasks: async () => {
    return fetch(`${API_URL}/api/v1/tasks`, {
      credentials: "include",
    });
  },

  createTask: async (data) => {
    return fetch(`${API_URL}/api/v1/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
  },

  deleteTask: async (id) => {
    return fetch(`${API_URL}/api/v1/tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  },
  updateTask: async (id, data) => {
    return fetch(`${API_URL}/api/v1/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
  },
};
