import { useState } from "react";
import {
  loginDoctor,
  DoctorLoginPayload,
  DoctorLoginResponse,
} from "@services/authService/authDoctorService";

export function useDoctorLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DoctorLoginResponse | null>(null);

  async function login(payload: DoctorLoginPayload) {
    setLoading(true);
    setError(null);
    try {
      const result = await loginDoctor(payload);
      setData(result);
      return result;
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error, data };
}
