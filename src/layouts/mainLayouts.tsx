import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/common/landingPageNavigation/LandingPageNavbar";
import Footer from "@/components/common/landingPageNavigation/LandingPageFooter";

const MainLayout: React.FC = () => (
  <Box className="flex min-h-screen bg-gray-50 dark:bg-gray-800" sx={{overflow: "hidden"}}>
    <Box className="flex-1 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-30 w-full">
        <Navbar />
      </header>
      <main className="flex-1 px-6">
        <Outlet />
      </main>
      <Footer />
    </Box>
  </Box>
);

export default MainLayout;
