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
import {
  Portrait,
  AlternateEmail,
  Lock,
  HowToReg,
} from "@mui/icons-material";
import { useRegister } from "@hooks/api/useAuth/useRegisteration";

interface RegisterFormProps {
  userType: "user" | "doctor";
}

const RegisterForm: React.FC<RegisterFormProps> = ({ userType }) => {
  const navigate = useNavigate();
  const isDoctor = userType === "doctor";
  const mainColor = isDoctor ? "#1d6d62" : "#212121";

  const { register, loading, error, data } = useRegister();

  const userFields = [
    { key: "username", label: "Full Name", icon: <Portrait /> },
    { key: "email", label: "Email Address", icon: <AlternateEmail /> },
    { key: "password1", label: "Password", icon: <Lock />, type: "password" },
    {
      key: "password2",
      label: "Confirm Password",
      icon: <HowToReg />,
      type: "password",
    },
  ];
  const fields = userFields;

  // initialize form state with all possible keys
  const [form, setForm] = useState<Record<string, string>>(
    fields.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {})
  );

  const handleChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      username: form.username,
      email: form.email,
      password1: form.password1,
      password2: form.password2,
    };
    const res = await register(payload);
    localStorage.setItem("role", "user");
    localStorage.setItem("token", res.key);
    navigate("/dashboard/profile-user", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={3} sx={{ mt: 2 }}>
        {fields.map(({ key, label, icon, type = "text" }) => (
          <TextField
            key={key}
            fullWidth
            label={label}
            type={type}
            value={form[key]}
            onChange={handleChange(key)}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {React.cloneElement(icon, { sx: { color: mainColor } })}
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
        ))}

        {error && <Alert severity="error">{error}</Alert>}
        {data && <Alert severity="success">Registration successful!</Alert>}

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
            py: 1.5,
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
          Create Account
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
