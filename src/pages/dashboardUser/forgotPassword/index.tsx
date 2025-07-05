import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  styled,
  useTheme,
  InputAdornment,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";

const API = "http://127.0.0.1:8000/TabebAI";

// A full‐screen container with a subtle background
const FullScreen = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(135deg, ${theme.palette.primary.light}22 0%, ${theme.palette.primary.main}11 100%)`,
  padding: theme.spacing(2),
}));

// The card that holds the form
const FormCard = styled(Paper)(({ theme }) => ({
  maxWidth: 420,
  width: "100%",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: theme.shadows[4],
}));

export default function ForgotPasswordPage() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        `${API}/password/reset/`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FullScreen>
      <FormCard>
        <Box textAlign="center" mb={3}>
          <LockOpenIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
          <Typography variant="h5" fontWeight={600} mt={1}>
            Reset Your Password
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Enter your email address and we'll send you a link to reset your password.
          </Typography>
        </Box>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Check your email for reset instructions.
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!success && (
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
              sx={{
                mt: 1,
                py: 1.5,
                fontWeight: 600,
                borderRadius: theme.shape.borderRadius,
                textTransform: "none",
              }}
            >
              Send Reset Link
            </Button>
          </Box>
        )}
      </FormCard>
    </FullScreen>
  );
}