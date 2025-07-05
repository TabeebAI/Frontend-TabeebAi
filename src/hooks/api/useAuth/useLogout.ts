import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@services/authService/authServiceApi";

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return handleLogout;
};