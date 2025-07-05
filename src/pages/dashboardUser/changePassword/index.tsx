import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useChangePassword } from "@hooks/api/changePassword/useChangePassword";

const ChangePasswordPage: React.FC = () => {
  const [new_password1, setNewPassword1] = useState("");
  const [new_password2, setNewPassword2] = useState("");
  const [success, setSuccess] = useState(false);
  const { changePassword, loading, error } = useChangePassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous states
    setSuccess(false);
    
    const success = await changePassword({ new_password1, new_password2 });
    if (success) {
      setSuccess(true);
      // Clear form on success
      setNewPassword1("");
      setNewPassword2("");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper sx={{ p: 4, width: "100%", maxWidth: 550 }}>
        <Typography variant="h6" mb={2}>
          Change Password
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Password changed successfully
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          display="flex" 
          flexDirection="column" 
          gap={3}
        >
          <TextField
            label="New Password"
            type="password"
            value={new_password1}
            onChange={(e) => setNewPassword1(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={new_password2}
            onChange={(e) => setNewPassword2(e.target.value)}
            required
            fullWidth
          />
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            fullWidth
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Change Password"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChangePasswordPage;