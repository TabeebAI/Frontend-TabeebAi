import React from "react";
import {
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import {
  MedicalServices,
  Person,
} from "@mui/icons-material";

const RoleCard: React.FC<{
  role: "user" | "doctor";
  label: string;
  selected: boolean;
  onClick: () => void;
}> = ({ role, label, selected, onClick }) => (
  <Button
    fullWidth
    variant={selected ? "contained" : "outlined"}
    onClick={onClick}
    sx={{
      height: 120,
      flexDirection: "column",
      borderColor: selected ? (role === "doctor" ? "#1d6d62" : "#212121") : "#e0e0e0",
      backgroundColor: selected ? (role === "doctor" ? "rgba(29, 109, 98, 0.08)" : "#f5f5f5") : "transparent",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: role === "doctor" ? "#1d6d62" : "#212121",
        backgroundColor: role === "doctor" ? "rgba(29, 109, 98, 0.04)" : "#fafafa",
      },
    }}
  >
    <Avatar
      sx={{
        width: 40,
        height: 40,
        mb: 1.5,
        backgroundColor: role === "doctor" ? "#1d6d62" : "#212121",
      }}
    >
      {role === "doctor" ? (
        <MedicalServices fontSize="small" />
      ) : (
        <Person fontSize="small" />
      )}
    </Avatar>
    <Typography
      variant="h6"
      sx={{
        color: selected ? (role === "doctor" ? "#1d6d62" : "#212121") : "#616161",
        fontWeight: 600,
      }}
    >
      {label}
    </Typography>
  </Button>
);

export default RoleCard;