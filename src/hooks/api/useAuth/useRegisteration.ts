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
      console.log(err)
      setError(
        err.response?.data?.password1?.[0] || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, data };
};
