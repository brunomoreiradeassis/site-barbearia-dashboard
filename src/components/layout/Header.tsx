
import React, { useState, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NotificationBell } from "@/components/shared/NotificationBell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export function Header({ onMenuToggle, isSidebarOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b glass-panel",
        isScrolled && "shadow-sm",
        isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
      )}
    >
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 rounded-full"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        
        <h1 className="text-xl font-semibold tracking-tight mr-4 hidden sm:block">
          Barber Dashboard
        </h1>
        
        <div className={cn(
          "flex-1 flex items-center justify-end md:justify-between",
          isSearchOpen && isMobile && "hidden"
        )}>
          <div className="hidden md:flex md:flex-1 max-w-md">
            <form className="w-full">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar..."
                  className="w-full pl-8 rounded-full bg-muted/50 border-muted focus-visible:bg-background transition-colors"
                />
              </div>
            </form>
          </div>
          
          <div className="flex items-center gap-2">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
            <NotificationBell />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full overflow-hidden"
            >
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=random"
                alt="User Avatar"
                className="h-full w-full object-cover"
              />
              <span className="sr-only">User profile</span>
            </Button>
          </div>
        </div>
        
        {isSearchOpen && isMobile && (
          <div className="absolute inset-0 z-50 flex items-center bg-background p-4 animate-fade-in">
            <form className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                autoFocus
                className="w-full pl-10 pr-10 h-10 bg-muted/50 border-muted"
              />
            </form>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close search</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
