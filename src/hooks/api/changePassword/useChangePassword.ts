import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/TabebAI";

interface ChangePasswordPayload {
  new_password1: string;
  new_password2: string;
}

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = async (
    data: ChangePasswordPayload
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      await axios.post(`${API_BASE_URL}/password/change/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      return true;
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error };
};
