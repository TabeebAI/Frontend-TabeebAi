import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import {
  PieChart as OverviewIcon,
  Forum as ChatBotIcon,
  MedicalServices as MedicalRecordIcon,
  Schedule as AppointmentsIcon,
  People as PatientsIcon,
  HelpOutline as HelpIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";

export type UserRole = "user" | "doctor";

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  role,
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showLabels, setShowLabels] = useState(!isCollapsed);

  // build menu based on role
  const menuItems = role === "user"
    ? [
        { icon: OverviewIcon, label: "Overview", route: "/dashboard/profile-user" },
        { icon: ChatBotIcon, label: "Chat Bot", route: "/dashboard/chat-bot" },
        { icon: MedicalRecordIcon, label: "Medical Record", route: "/dashboard/medical-record" },
      ]
    : [
        { icon: OverviewIcon, label: "Overview", route: "/dashboard/profile-doctor" },
        { icon: PatientsIcon, label: "My Patients", route: "/dashboard/visits" },
        { icon: AppointmentsIcon, label: "Appointments", route: "/dashboard/appointments" },
      ];

  // animate labels on collapse/expand
  useEffect(() => {
    if (!isCollapsed) {
      const t = setTimeout(() => setShowLabels(true), 200);
      return () => clearTimeout(t);
    } else {
      setShowLabels(false);
    }
  }, [isCollapsed]);

  // determine width
  const width = isMobile
    ? isCollapsed
      ? 0
      : 260
    : isCollapsed
    ? 73
    : 260;

  return (
    <>
      {/* dark backdrop on mobile when open */}
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
          width,
          height: "100vh",
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRight: 1,
          borderColor: theme.palette.divider,
          boxShadow: theme.shadows[4],
          overflowX: "hidden",
          transition: "width 0.3s ease",
          display: "flex",
          flexDirection: "column",
          zIndex: 30,
        }}
      >
        {/* logo / brand */}
        <Box
          sx={{
            fontFamily: "adamina",
            fontSize: { xs: "25px", lg: "40px" },
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            opacity: 1,
            p: 2,
          }}
        >
          {isCollapsed ? "T" : "Tabeeb"}
        </Box>

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
                  bgcolor: selected ? theme.palette.primary.dark : "transparent",
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
                {!isCollapsed && (
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

        {/* footer */}
        <Box sx={{ px: 2, pb: 2 }}>
          {[
            { icon: HelpIcon, label: "Help" },
            { icon: LogoutIcon, label: "Log out" },
          ].map(({ icon: Icon, label }) => (
            <Box
              key={label}
              onClick={() => console.log(label)}
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
              {!isCollapsed && (
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
