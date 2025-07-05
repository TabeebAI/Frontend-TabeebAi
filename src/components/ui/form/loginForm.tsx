import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import { Close, Badge, Email, Lock } from "@mui/icons-material";
import { useLogin } from "@hooks/api/useAuth/useLogin";
import { useDoctorLogin } from "@hooks/api/useAuth/useDoctorLogin";

interface LoginFormProps {
  userType: "user" | "doctor";
  onForgot?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ userType, onForgot }) => {
  const isDoctor = userType === "doctor";
  const mainColor = isDoctor ? "#1d6d62" : "#212121";
  const navigate = useNavigate();

  const {
    login: userLogin,
    loading: userLoading,
    error: userError,
  } = useLogin();
  const {
    login: doctorLogin,
    loading: docLoading,
    error: docError,
  } = useDoctorLogin();

  const [showError, setShowError] = useState(true);
  const error = userError || docError;

  // State initialization
  const [docForm, setDocForm] = useState({
    full_name: "",
    national_id: "",
    license_number: "",
  });

  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleDocChange =
    (access: keyof typeof docForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setDocForm((f) => ({ ...f, [access]: e.target.value }));

  const handleUserChange =
    (key: keyof typeof userForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setUserForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(true);

    try {
      if (isDoctor) {
        const res = await doctorLogin(docForm);
        localStorage.setItem("role", "doctor");
        localStorage.setItem("token", res.access);
        // replace: true so it doesn’t leave “/login” in history
        navigate("/dashboard/profile-doctor", { replace: true });
      } else {
        const res = await userLogin(userForm);
        localStorage.setItem("role", "user");
        localStorage.setItem("token", res.key);
        navigate("/dashboard/profile-user", { replace: true });
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2} sx={{ my: 1 }}>
        {/* Error Display - Improved */}
        <Collapse in={!!error && showError}>
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            action={
              <IconButton
                size="small"
                color="inherit"
                onClick={() => setShowError(false)}
              >
                <Close fontSize="small" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        </Collapse>

        {isDoctor ? (
          <>
            <TextField
              fullWidth
              label="Full Name"
              value={docForm.full_name}
              onChange={handleDocChange("full_name")}
              disabled={docLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Badge sx={{ color: mainColor }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="National ID"
              value={docForm.national_id}
              onChange={handleDocChange("national_id")}
              disabled={docLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Badge sx={{ color: mainColor }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="License Number"
              value={docForm.license_number}
              onChange={handleDocChange("license_number")}
              disabled={docLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: mainColor }} />
                  </InputAdornment>
                ),
              }}
            />
          </>
        ) : (
          // Fixed: Removed unnecessary Full Name field for user login
          <>
            <TextField
              fullWidth
              label="Full Name"
              value={userForm.username}
              onChange={handleUserChange("username")}
              disabled={userLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Badge sx={{ color: mainColor }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={userForm.email}
              onChange={handleUserChange("email")}
              disabled={userLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: mainColor }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={userForm.password}
              onChange={handleUserChange("password")}
              disabled={userLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: mainColor }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box textAlign="right">
              <Button
                size="small"
                onClick={() => {
                  onForgot?.();
                  navigate("/forgot-password");
                }}
                sx={{
                  textTransform: "none",
                  color: mainColor,
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                Forgot Password?
              </Button>
            </Box>
          </>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={userLoading || docLoading}
          startIcon={
            (userLoading || docLoading) && (
              <CircularProgress size={20} color="inherit" />
            )
          }
          sx={{
            mt: 2,
            py: 1.2,
            fontSize: "1rem",
            textTransform: "none",
            fontWeight: 700,
            backgroundColor: mainColor,
            color: "#fff",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: isDoctor ? "#145246" : "#424242",
              transform: "translateY(-1px)",
            },
          }}
        >
          Sign In
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
