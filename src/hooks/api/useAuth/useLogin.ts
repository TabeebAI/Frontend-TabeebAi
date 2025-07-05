import { useState } from "react";
import {
  loginUser,
  LoginPayload,
  LoginResponse,
} from "@services/authService/authServiceApi";
import { useToasterContext } from "@contexts/toaster/useToasterContext";

export const useLogin = () => {
  const { showToaster } = useToasterContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LoginResponse | null>(null);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await loginUser(payload);
      showToaster({ message: "Login successfully", type: "success" });
      setData(result);
      return result;
    } catch (err) {
      setError(err.response?.data?.non_field_errors || "Login failed.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, data };
};
