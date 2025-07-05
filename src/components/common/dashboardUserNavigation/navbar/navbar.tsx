import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Notifications as NotificationsIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@hooks/api/useAuth/useLogout";

interface NavbarProps {
  activeTab: string;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const theme = useTheme();
  const logout = useLogout();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: theme.shadows[1],
        borderRadius: { xs: 0, sm: 2 },
        mt: { xs: 0, sm: 2 },
        px: 2,
        py: 1,
        backdropFilter: "blur(20px)",
        background:
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(36, 48, 63, 0.8)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 0, sm: 2 },
          gap: 2,
        }}
      >
        {/* Left Section - Collapse Button */}
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{ color: "text.primary" }}
          >
            {isCollapsed ? <MenuIcon /> : <CloseIcon />}
          </IconButton>
        </Box>

        {/* Right Section - Actions */}
        <Box display="flex" alignItems="center">
          {/* Notifications */}
          <IconButton sx={{ color: "text.secondary" }}>
            <Badge badgeContent={4} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile Dropdown */}
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            onClick={handleMenuOpen}
            sx={{ cursor: "pointer", ml: 2 }}
          >
            <Avatar
              src="https://placehold.co/150"
              sx={{ width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }}
            />
            {!isMobile && (
              <Box textAlign="left">
                <Typography variant="body2" fontWeight={500} noWrap>
                  John Doe
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  john@example.com
                </Typography>
              </Box>
            )}
            <KeyboardArrowDownIcon fontSize={isMobile ? "small" : "medium"} />
          </Box>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                width: 220,
                mt: 1,
                boxShadow: theme.shadows[4],
                borderRadius: 0.5,
                bgcolor: theme.palette.background.paper,
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/settings");
              }}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <SettingsIcon fontSize="small" /> Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                logout();
              }}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <LogoutIcon fontSize="small" /> Log Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
