
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronRight,
  CircleDollarSign,
  Home,
  Scissors,
  Users,
  UserCheck,
  Settings,
  BookOpen,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  isOpen: boolean;
}

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Agenda",
    href: "/appointments",
    icon: Calendar,
  },
  {
    title: "Serviços",
    href: "/services",
    icon: Scissors,
  },
  {
    title: "Clientes",
    href: "/clients",
    icon: Users,
  },
  {
    title: "Equipe",
    href: "/team",
    icon: UserCheck,
  },
  {
    title: "Financeiro",
    href: "/finance",
    icon: CircleDollarSign,
  },
];

const secondaryNavItems = [
  {
    title: "Configurações",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Ajuda",
    href: "/help",
    icon: BookOpen,
  },
];

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 flex flex-col pt-16 transition-all duration-300 ease-in-out shadow-md glass-panel",
        isOpen ? "w-64" : "w-20",
        "bg-sidebar backdrop-blur-md"
      )}
    >
      <div className="flex-1 flex flex-col overflow-y-auto scrollbar-none py-6">
        <nav className="flex-1 px-3 space-y-6">
          <div>
            <h3 className={cn(
              "text-sidebar-foreground/60 font-medium transition-all",
              isOpen ? "text-xs px-3 mb-2" : "text-center text-[10px] mb-2"
            )}>
              {isOpen ? "PRINCIPAL" : "MENU"}
            </h3>
            <ul className="space-y-1">
              {mainNavItems.map((item) => (
                <li key={item.title}>
                  <TooltipProvider>
                    <Tooltip delayDuration={!isOpen ? 100 : 1000}>
                      <TooltipTrigger asChild>
                        <Link
                          to={item.href}
                          className={cn(
                            "flex items-center px-3 py-2.5 rounded-lg text-sm transition-all",
                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            location.pathname === item.href
                              ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                              : "text-sidebar-foreground",
                            !isOpen && "justify-center"
                          )}
                        >
                          <item.icon className={cn(
                            "h-5 w-5 shrink-0",
                            location.pathname === item.href ? "animate-pulse" : "",
                            isOpen && "mr-2",
                          )} />
                          <span className={cn(
                            "transition-all duration-300",
                            !isOpen && "hidden"
                          )}>
                            {item.title}
                          </span>
                          {location.pathname === item.href && isOpen && (
                            <ChevronRight className="h-4 w-4 ml-auto animate-fade-in" />
                          )}
                        </Link>
                      </TooltipTrigger>
                      {!isOpen && (
                        <TooltipContent side="right">
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className={cn(
              "text-sidebar-foreground/60 font-medium transition-all",
              isOpen ? "text-xs px-3 mb-2" : "text-center text-[10px] mb-2"
            )}>
              {isOpen ? "SISTEMA" : "SISTEMA"}
            </h3>
            <ul className="space-y-1">
              {secondaryNavItems.map((item) => (
                <li key={item.title}>
                  <TooltipProvider>
                    <Tooltip delayDuration={!isOpen ? 100 : 1000}>
                      <TooltipTrigger asChild>
                        <Link
                          to={item.href}
                          className={cn(
                            "flex items-center px-3 py-2.5 rounded-lg text-sm transition-all",
                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            location.pathname === item.href
                              ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                              : "text-sidebar-foreground",
                            !isOpen && "justify-center"
                          )}
                        >
                          <item.icon className={cn(
                            "h-5 w-5 shrink-0",
                            isOpen && "mr-2"
                          )} />
                          <span className={cn(
                            "transition-all duration-300",
                            !isOpen && "hidden"
                          )}>
                            {item.title}
                          </span>
                        </Link>
                      </TooltipTrigger>
                      {!isOpen && (
                        <TooltipContent side="right">
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <div className={cn(
        "border-t border-sidebar-border p-4 flex items-center",
        !isOpen && "justify-center"
      )}>
        <div className={cn(
          "flex items-center",
          !isOpen && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-full bg-sidebar-accent overflow-hidden mr-3">
            <img
              src="https://ui-avatars.com/api/?name=Barber&background=random"
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className={cn(
            "transition-all duration-300",
            !isOpen && "hidden"
          )}>
            <p className="text-sm font-medium text-sidebar-foreground">Barber Studio</p>
            <p className="text-xs text-sidebar-foreground/60">Professional</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
