import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Close, ArrowBack } from "@mui/icons-material";
import LoginForm from "@components/ui/form/loginForm";
import RoleCard from "./roleSelector";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToRegister: (role: "user" | "doctor") => void;
  selectedRole: "user" | "doctor" | null;
  setSelectedRole: (role: "user" | "doctor" | null) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  onSwitchToRegister,
  selectedRole,
  setSelectedRole,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          px: { xs: 2, sm: 4 },
          py: 3,
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          {selectedRole && (
            <IconButton
              onClick={() => setSelectedRole(null)}
              sx={{ color: "#616161", "&:hover": { color: "#1d6d62" } }}
            >
              <ArrowBack />
            </IconButton>
          )}
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#212121" }}>
            {selectedRole ? `Sign In as ${selectedRole}` : "Select Your Role"}
          </Typography>
          <Box flexGrow={1} />
          <IconButton
            onClick={onClose}
            size="large"
            sx={{ color: "#616161", "&:hover": { color: "#1d6d62" } }}
          >
            <Close />
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
            <LoginForm userType={selectedRole} />
            <Box mt={3} textAlign="center">
              <Typography variant="body2" sx={{ color: "#757575" }}>
                Don’t have an account?{" "}
                <Button
                  onClick={() => onSwitchToRegister(selectedRole)}
                  size="small"
                  variant="text"
                  sx={{
                    color: "#1d6d62",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#145246",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Register
                </Button>
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
