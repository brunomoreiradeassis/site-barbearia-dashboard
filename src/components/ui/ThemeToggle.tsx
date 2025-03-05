
import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative overflow-hidden rounded-full w-10 h-10"
    >
      <Sun
        className={`h-5 w-5 absolute ${
          theme === "light" 
            ? "animate-fade-in opacity-100 transform rotate-0" 
            : "animate-fade-out opacity-0 transform rotate-90"
        } transition-all duration-500`}
      />
      <Moon
        className={`h-5 w-5 absolute ${
          theme === "dark" 
            ? "animate-fade-in opacity-100 transform rotate-0" 
            : "animate-fade-out opacity-0 transform -rotate-90"
        } transition-all duration-500`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
