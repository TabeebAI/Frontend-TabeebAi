import React, { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "@components/common/dashboardUserNavigation/navbar/navbar";
import SideBar from "@components/common/dashboardUserNavigation/sidebar/sidebar";

const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Sidebar */}
      <aside
        className={`${isCollapsed ? "w-0 lg:w-[73px]" : "w-[260px]"} transition-all duration-300`}
      >
        <SideBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </aside>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden ">
        {/* Navbar */}
        <header className="w-full px:0 lg:px-4">
          <Navbar
            activeTab={activeTab}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
