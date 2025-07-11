import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/TabebAI";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password1: string;
  password2: string;
}
export interface RegisterResponse {
  key: string;
}

export const registerUser = async (
  data: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await axios.post(`${API_BASE_URL}/Registration/`, data, {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
  });
  return response.data;
};

export interface LoginPayload {
  username?: string;
  email?: string;
  password: string;
}
export interface LoginResponse {
  key: string;
}

export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post(`${API_BASE_URL}/login/`, data, {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
  });
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  await axios.post(`${API_BASE_URL}/logout/`, null, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
};
