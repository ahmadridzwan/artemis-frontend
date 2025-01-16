const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper function to make API requests
const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
  
    if (token) {
      headers["authorization"] = `${token}`;
    }
  
    const options = {
      method,
      headers,
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.text();
    return JSON.parse(data);
  } catch (error) {
    console.error("API Error:", error.message);
    return { error: error.message };
  }
};

export const createBlock = async (formData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blocks`, {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: formData,
    });

    return response.json();
  } catch (error) {
    console.error("Create Block API Error:", error);
    return { error: error.message };
  }
};

export const loginUser = async (credentials) => {
  return apiRequest("/auth/login", "POST", credentials);
};

export const registerUser = async (credentials) => {
  return apiRequest("/auth/register", "POST", credentials);
};

export const getAllPredefinedBlocks = async (token) => { 
  return apiRequest("/blocks", "GET", null, token);
};

export const createPredefinedBlock = async (blockData, token) => {
  return apiRequest("/blocks", "POST", blockData, token);
};

export const getUserBlocks = async (token) => { 
  return apiRequest("/userblocks", "GET", null, token);
};

export const addUserBlocks = async (blockIds, token) => {
  return apiRequest("/userblocks/add", "POST", { blockIds }, token);
};

export const removeUserBlock = async (blockId, token) => {
  return apiRequest("/userblocks/remove", "POST", { blockId }, token);
};
