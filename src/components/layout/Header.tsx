
import React from "react";
import { Button } from "@/components/ui/button";
import { BellIcon, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Header({ 
  toggleSidebar,
  isSidebarOpen 
}: { 
  toggleSidebar: () => void;
  isSidebarOpen?: boolean;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b z-40 bg-background/80 backdrop-blur-sm">
      <div className="flex h-16 items-center px-4 lg:px-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="mr-2 lg:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
        
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground"
          >
            <BellIcon className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 text-xs"
          >
            <div className="h-6 w-6 rounded-full overflow-hidden bg-primary-foreground">
              <img 
                alt="Avatar" 
                className="h-full w-full object-cover"
                src="https://ui-avatars.com/api/?name=Barbershop+Admin&background=random"
              />
            </div>
            <span className="hidden md:inline">Admin</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
