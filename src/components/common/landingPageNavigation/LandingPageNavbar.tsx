import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  styled,
} from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import LoginModal from "@components/ui/modal/loginModal";
import RegisterModal from "@components/ui/modal/registerModal";

const GradientText = styled("span")(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.dark} 90%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 900,
  letterSpacing: "-0.05em",
}));

const sections = [
  { label: "Home", to: "hero" },
  { label: "How It Works", to: "how-it-works" },
  { label: "Features", to: "features" },
  { label: "Testimonials", to: "testimonials" },
  { label: "Start Now", to: "cta" },
];

const Navbar: React.FC = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"user" | "doctor" | null>(null);

  const handleOpenLogin = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const handleOpenRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          background: "primary.main",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(58, 51, 44, 0.1)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: 1,
          }}
        >
          <Typography variant="h4" fontWeight={800}>
            <GradientText>HISS</GradientText>
          </Typography>

          <Stack
            direction="row"
            spacing={4}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {sections.map(({ label, to }) => (
              <ScrollLink
                key={label}
                to={to}
                smooth={true}
                duration={600}
                offset={-80}
                spy
                activeClass="active"
                style={{ position: "relative" }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "14px",
                    cursor: "pointer",
                    position: "relative",
                    color: "primary.contrastText",
                    transition: "all 0.3s ease",
                    "&:hover, &.active": {
                      color: "secondary.main",
                      "&::after": {
                        width: "100%",
                        background: (theme) =>
                          `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
                      },
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      width: 0,
                      height: 3,
                      background: "transparent",
                      transition: "width 0.3s ease, background 0.3s ease",
                    },
                  }}
                >
                  {label}
                </Typography>
              </ScrollLink>
            ))}
          </Stack>

          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              onClick={handleOpenLogin}
              sx={{
                borderRadius: "999px",
                borderColor: "secondary.main",
                color: "secondary.main",
                "&:hover": {
                  borderColor: "secondary.dark",
                  color: "primary.main",
                  backgroundColor: "secondary.dark",
                  boxShadow: (theme) =>
                    `0 2px 8px ${theme.palette.secondary.light}`,
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={handleOpenRegister}
              sx={{
                borderRadius: "999px",
                color: "primary.main",
                background: (theme) =>
                  `linear-gradient(45deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
                "&:hover": {
                  transform: "translateY(-1px)",
                  background: (theme) =>
                    `linear-gradient(45deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
                  boxShadow: (theme) =>
                    `0 4px 15px ${theme.palette.secondary.light}`,
                },
                transition: "all 0.3s ease",
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Modals */}
      <LoginModal
        open={loginOpen}
        onClose={() => {
          setLoginOpen(false);
          setSelectedRole(null);
        }}
        onSwitchToRegister={(role) => {
          setLoginOpen(false);
          setSelectedRole(role);
          setRegisterOpen(true);
        }}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
      
      <RegisterModal
        open={registerOpen}
        onClose={() => {
          setRegisterOpen(false);
          setSelectedRole(null);
        }}
        onSwitchToLogin={(role) => {
          setRegisterOpen(false);
          setSelectedRole(role);
          setLoginOpen(true);
        }}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
    </>
  );
};

export default Navbar;
