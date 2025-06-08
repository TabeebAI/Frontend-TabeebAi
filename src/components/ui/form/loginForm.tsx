// src/components/auth/LoginForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Badge, Lock, Email, Person } from "@mui/icons-material";
import { useLogin } from "@hooks/api/useAuth/useLogin";
import { LoginPayload } from "@services/authService/authServiceApi";

interface LoginFormProps {
  userType: "user" | "doctor";
}

const LoginForm: React.FC<LoginFormProps> = ({ userType }) => {
  const isDoctor = userType === "doctor";
  const mainColor = isDoctor ? "#1d6d62" : "#212121";
  const navigate = useNavigate();
  const { login, loading, error, data } = useLogin();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // payload must satisfy LoginPayload
    const payload: LoginPayload = { password: form.password };

    if (isDoctor) {
      payload.username = form.username;
    } else {
      // user: include both username & email
      payload.username = form.username;
      payload.email = form.email;
    }

    try {
      const res = await login(payload);
      localStorage.setItem("token", res.key);
      navigate("/dashboard", { replace: true });
    } catch {
      /* error is surfaced via the hook */
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2} sx={{ my: 1 }}>
        {/* For users: show the User Name field */}
        {!isDoctor && (
          <TextField
            fullWidth
            label="User Name"
            name="username"
            variant="outlined"
            value={form.username}
            onChange={handleChange("username")}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: mainColor }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#e0e0e0" },
                "&:hover fieldset": { borderColor: "#bdbdbd" },
                "&.Mui-focused fieldset": { borderColor: mainColor },
              },
              "& .MuiInputLabel-root": {
                color: "#616161",
                fontWeight: 500,
                "&.Mui-focused": { color: mainColor },
              },
            }}
          />
        )}

        {/* Email for users, Syndicate Number for doctors */}
        <TextField
          fullWidth
          label={isDoctor ? "Syndicate Number" : "Email Address"}
          name={isDoctor ? "username" : "email"}
          type={isDoctor ? "text" : "email"}
          variant="outlined"
          value={isDoctor ? form.username : form.email}
          onChange={handleChange(isDoctor ? "username" : "email")}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {isDoctor ? (
                  <Badge sx={{ color: mainColor }} />
                ) : (
                  <Email sx={{ color: mainColor }} />
                )}
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#e0e0e0" },
              "&:hover fieldset": { borderColor: "#bdbdbd" },
              "&.Mui-focused fieldset": { borderColor: mainColor },
            },
            "& .MuiInputLabel-root": {
              color: "#616161",
              fontWeight: 500,
              "&.Mui-focused": { color: mainColor },
            },
          }}
        />

        {/* Password */}
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          value={form.password}
          onChange={handleChange("password")}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: mainColor }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#e0e0e0" },
              "&:hover fieldset": { borderColor: "#bdbdbd" },
              "&.Mui-focused fieldset": { borderColor: mainColor },
            },
            "& .MuiInputLabel-root": {
              color: "#616161",
              fontWeight: 500,
              "&.Mui-focused": { color: mainColor },
            },
          }}
        />

        {/* Feedback */}
        {error && <Alert severity="error">{error}</Alert>}
        {data && <Alert severity="success">Logged in successfully!</Alert>}

        {/* Submit */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : undefined
          }
          sx={{
            mt: 2,
            py: 1.2,
            fontSize: "1rem",
            textTransform: "none",
            fontWeight: 700,
            backgroundColor: mainColor,
            color: "#ffffff",
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: isDoctor ? "#145246" : "#424242",
              boxShadow: `0 4px 14px ${mainColor}33`,
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
