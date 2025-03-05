
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Handle sidebar state on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider>
      <TooltipProvider>
        <div className="app-container">
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <Sidebar isOpen={isSidebarOpen} />
          <main className={cn(
            "main-content",
            isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
          )}>
            <Outlet />
          </main>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
