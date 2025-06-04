import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Badge, Lock, Email } from "@mui/icons-material";

interface LoginFormProps {
  userType: "user" | "doctor";
}

const LoginForm: React.FC<LoginFormProps> = ({ userType }) => {
  const isDoctor = userType === "doctor";
  const mainColor = isDoctor ? "#1d6d62" : "#212121";
  const navigate = useNavigate();

  const handleLogin = () => {
    // TODO: your real login logic here…
    localStorage.setItem("token", "fake-jwt-token");
    navigate("/dashboard", { replace: true });
  };

  return (
    <form>
      <Box sx={{ my: 1 }} display="flex" flexDirection="column" gap={2}>
        <TextField
          fullWidth
          label={isDoctor ? "Syndicate Number" : "Email Address"}
          name={isDoctor ? "syndicate-number" : "email"}
          type={isDoctor ? "text" : "email"}
          variant="outlined"
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

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
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

        <Box textAlign="right">
          <Button
            variant="text"
            size="small"
            sx={{
              color: mainColor,
              "&:hover": {
                backgroundColor: `rgba(${isDoctor ? "29, 109, 98" : "33, 33, 33"}, 0.08)`,
                color: isDoctor ? "#145246" : "#424242",
              },
            }}
          >
            Forgot Password?
          </Button>
        </Box>

        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          fullWidth
          variant="contained"
          size="large"
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

        {!isDoctor && (
          <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 3 }}>
              <Box
                sx={{ flexGrow: 1, borderBottom: 1, borderColor: "#eeeeee" }}
              />
              <Typography variant="body2" sx={{ color: "#757575" }}>
                OR
              </Typography>
              <Box
                sx={{ flexGrow: 1, borderBottom: 1, borderColor: "#eeeeee" }}
              />
            </Box>

            <Button
              fullWidth
              variant="outlined"
              startIcon={
                <Box
                  component="img"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  sx={{ width: 20, height: 25, filter: "brightness(0.8)" }}
                />
              }
              sx={{
                borderColor: "#e0e0e0",
                color: "#424242",
                textTransform: "none",
                fontWeight: 500,
                py: 0.9,
                "&:hover": {
                  borderColor: "#bdbdbd",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Continue with Google
            </Button>
          </>
        )}
      </Box>
    </form>
  );
};

export default LoginForm;
