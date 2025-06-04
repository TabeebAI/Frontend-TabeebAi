import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RegisterForm from "@components/ui/form/registerForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RoleCard from "./roleSelector";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: (role: "user" | "doctor") => void;
  selectedRole: "user" | "doctor" | null;
  setSelectedRole: (role: "user" | "doctor" | null) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onClose,
  onSwitchToLogin,
  selectedRole,
  setSelectedRole
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          px: { xs: 2, sm: 4 },
          py: { xs: 3, sm: 5 },
          backgroundColor: "#f5f5f5",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 3 }}>
        <Box display="flex" alignItems="center" gap={2}>
          {selectedRole && (
            <IconButton
              onClick={() => setSelectedRole(null)}
              sx={{ color: "#616161", "&:hover": { color: "#1d6d62" } }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#212121" }}>
            {selectedRole ? `Register as ${selectedRole}` : "Select Your Role"}
          </Typography>
          <Box flexGrow={1} />
          <IconButton
            onClick={onClose}
            size="large"
            sx={{ color: "#616161", "&:hover": { color: "#1d6d62" } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {!selectedRole ? (
          <Box display="flex" flexDirection="column" gap={3} mt={2}>
            <RoleCard
              role="user"
              label="Regular User"
              selected={false}
              onClick={() => setSelectedRole("user")}
            />
            <RoleCard
              role="doctor"
              label="Medical Professional"
              selected={false}
              onClick={() => setSelectedRole("doctor")}
            />
          </Box>
        ) : (
          <>
            <RegisterForm userType={selectedRole} />
            <Box mt={4} textAlign="center">
              <Typography variant="body2" sx={{ color: "#616161" }}>
                Already have an account?{" "}
                <Button
                  onClick={() => onSwitchToLogin(selectedRole)}
                  variant="text"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    color: "#1d6d62",
                    "&:hover": {
                      background: "transparent",
                      color: "#145246",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign In
                </Button>
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;