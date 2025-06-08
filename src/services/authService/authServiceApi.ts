import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/TabebAI";

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
  const response = await axios.post(
    `${API_BASE_URL}/Registration/`,
    data,
    { headers: { "Content-Type": "application/json" } }
  );
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

export const loginUser = async (
  data: LoginPayload
): Promise<LoginResponse> => {
  const response = await axios.post(
    `${API_BASE_URL}/login/`,
    data,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};
