// RegisterForm.tsx
import React from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import {
  Fingerprint, // For national number
  Groups,      // For union number
  Portrait,    // For full name
  AlternateEmail, // For email
  Lock,        // For password
  HowToReg,    // For confirm password
} from "@mui/icons-material";

interface RegisterFormProps {
  userType: "user" | "doctor";
}

const RegisterForm: React.FC<RegisterFormProps> = ({ userType }) => {
  const isDoctor = userType === "doctor";
  const mainColor = isDoctor ? "#1d6d62" : "#212121";
  
  const doctorFields = [
    { label: "National Number", icon: <Fingerprint /> },
    { label: "Union Number", icon: <Groups /> },
    { label: "Password", icon: <Lock /> },
    { label: "Confirm Password", icon: <HowToReg /> }
  ];

  const userFields = [
    { label: "Full Name", icon: <Portrait /> },
    { label: "Email Address", icon: <AlternateEmail /> },
    { label: "Password", icon: <Lock /> },
    { label: "Confirm Password", icon: <HowToReg /> }
  ];

  const fields = isDoctor ? doctorFields : userFields;

  return (
    <form>
      <Box sx={{ my: 1 }} display="flex" flexDirection="column" gap={3}>
        {fields.map(({ label, icon }) => (
          <TextField
            key={label}
            fullWidth
            variant="outlined"
            label={label}
            name={label.toLowerCase().replace(" ", "-")}
            type={label.includes("Password") ? "password" : "text"}
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{
            mt: 2,
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