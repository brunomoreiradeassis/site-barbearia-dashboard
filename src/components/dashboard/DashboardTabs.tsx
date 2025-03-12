
import React from "react";
import { 
  LayoutDashboard, 
  CreditCard, 
  Package, 
  Star,
  CalendarCheck, 
  Bell, 
  Settings,
  Users
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  notificationCount?: number;
}

export function DashboardTabs({ 
  activeTab, 
  onTabChange,
  notificationCount = 0
}: DashboardTabsProps) {
  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard
    },
    {
      id: "payments",
      label: "Pagamentos",
      icon: CreditCard
    },
    {
      id: "inventory",
      label: "Inventário",
      icon: Package
    },
    {
      id: "feedback",
      label: "Avaliações",
      icon: Star
    },
    {
      id: "appointments",
      label: "Agenda",
      icon: CalendarCheck
    },
    {
      id: "team",
      label: "Equipe",
      icon: Users
    }
  ];

  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid grid-cols-3 sm:grid-cols-6 gap-1 p-1">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className={cn(
                "flex items-center gap-1.5",
                activeTab === tab.id ? "font-medium" : ""
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline-block">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
