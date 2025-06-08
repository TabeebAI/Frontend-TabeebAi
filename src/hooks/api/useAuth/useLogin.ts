import { useState } from "react";
import { loginUser, LoginPayload, LoginResponse } from "@services/authService/authServiceApi";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [data,    setData]    = useState<LoginResponse | null>(null);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await loginUser(payload);
      setData(result);
      return result;
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, data };
};