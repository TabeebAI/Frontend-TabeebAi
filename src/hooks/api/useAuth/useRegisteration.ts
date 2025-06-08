import { useState } from "react";
import {
  registerUser,
  RegisterPayload,
  RegisterResponse,
} from "@services/authService/authServiceApi";
import { useToasterContext } from "@contexts/toaster/useToasterContext";

export const useRegister = () => {
  const { showToaster } = useToasterContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RegisterResponse | null>(null);

  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await registerUser(payload);
      showToaster({ message: "Registration successfully", type: "success" });
      setData(result);
      return result;
    } catch (err) {
      setError(
        err.response?.data?.non_field_errors?.[0] || "Registration failed."
      );
      showToaster({
        message: err.response?.data?.message || "Failed to add banner",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, data };
};
