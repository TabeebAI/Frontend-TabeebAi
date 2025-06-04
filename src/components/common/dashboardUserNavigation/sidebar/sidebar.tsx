import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import {
  PieChart as PieChartIcon,
  // ChatBubbleOutline as ChatBotIcon,
  MedicalServices as MedicalRecordIcon,
  HelpOutline as HelpIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import ForumIcon from '@mui/icons-material/Forum';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showLabels, setShowLabels] = useState(!isCollapsed);

  const menuItems = [
    { icon: PieChartIcon, label: "Overview", route: "/dashboard" },
    { icon: ForumIcon, label: "Chat Bot", route: "/chat-bot" },
    {
      icon: MedicalRecordIcon,
      label: "Medical record",
      route: "/medical-record",
    },
  ];

  useEffect(() => {
    if (!isCollapsed) {
      setTimeout(() => setShowLabels(true), 200);
    } else {
      setShowLabels(false);
    }
  }, [isCollapsed]);

  // Determine width: on mobile, full or zero; on desktop, collapsedWidth or fullWidth
  const width = isMobile ? (isCollapsed ? 0 : 260) : isCollapsed ? 73 : 260;

  return (
    <>
      {/* Backdrop for mobile when open */}
      {isMobile && !isCollapsed && (
        <Box
          onClick={() => setIsCollapsed(true)}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0,0,0,0.5)",
            zIndex: 29,
          }}
        />
      )}

      <Box
        component="nav"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRight: 1,
          borderColor: theme.palette.divider,
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
          boxShadow: theme.shadows[4],
          zIndex: 30,
          overflowX: "hidden",
        }}
      >
        {/* Header */}
        <Box
          component="span"
          sx={{
            opacity: 1,
            transition: "opacity 0.3s",
            fontSize: { xs: "25px", lg: "40px" },
            fontFamily: "adamina",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {isCollapsed ? "T" : "Tabeeb"}
        </Box>

        <hr className="mb-8 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />

        {/* Menu */}
        <Box sx={{ flexGrow: 1, px: 2, overflowY: "auto" }}>
          {menuItems.map(({ icon: Icon, label, route }) => {
            const selected = activeTab === label;
            return (
              <Box
                key={label}
                onClick={() => {
                  setActiveTab(label);
                  navigate(route);
                  if (isMobile) setIsCollapsed(true);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                  py: 1,
                  mb: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  bgcolor: selected
                    ? theme.palette.primary.dark
                    : "transparent",
                  color: selected
                    ? theme.palette.background.default
                    : theme.palette.text.primary,
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                    color: theme.palette.background.default,
                  },
                  transition: "background-color 0.2s, color 0.2s",
                }}
              >
                <Icon fontSize="medium" />
                {width > 73 && (
                  <Box
                    component="span"
                    sx={{
                      ml: 1,
                      opacity: showLabels ? 1 : 0,
                      transform: showLabels
                        ? "translateX(0)"
                        : "translateX(-8px)",
                      transition: "opacity 0.2s, transform 0.2s",
                    }}
                  >
                    {label}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Footer */}
        <Box sx={{ px: 2, pb: 2 }}>
          {[
            { icon: HelpIcon, label: "Help" },
            { icon: LogoutIcon, label: "Log out" },
          ].map(({ icon: Icon, label }) => (
            <Box
              key={label}
              onClick={() => label === "Log out"}
              sx={{
                display: "flex",
                alignItems: "center",
                px: 1,
                py: 1,
                mb: 1,
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  color: theme.palette.background.default,
                },
                transition: "background-color 0.2s, color 0.2s",
              }}
            >
              <Icon fontSize="medium" />
              {width > 73 && (
                <Box
                  component="span"
                  sx={{
                    ml: 1,
                    opacity: showLabels ? 1 : 0,
                    transform: showLabels
                      ? "translateX(0)"
                      : "translateX(-8px)",
                    transition: "opacity 0.2s, transform 0.2s",
                  }}
                >
                  {label}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
