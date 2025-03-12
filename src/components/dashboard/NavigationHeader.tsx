
import React from "react";
import { Bell, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { DashboardSettings } from "@/components/dashboard/DashboardSettings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export function NavigationHeader({ notificationCount = 5 }) {
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notificações",
      description: "Você tem novas notificações para revisar.",
    });
  };

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between w-full bg-background/95 backdrop-blur-sm border-b border-border/40 px-4 h-16">
      <div className="flex items-center">
        <h1 className="text-xl font-bold mr-8 hidden md:block">Barbearia Pro</h1>
        <div className="relative hidden md:block max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="pl-8 w-[200px] lg:w-[300px]"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                  variant="destructive"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleNotificationClick}>
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">Agendamento confirmado</span>
                  <span className="text-xs text-muted-foreground">Carlos Silva confirmou o agendamento para hoje às 14h</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleNotificationClick}>
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">Estoque baixo</span>
                  <span className="text-xs text-muted-foreground">O produto "Pomada Modeladora" está com estoque baixo</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleNotificationClick}>
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">Nova avaliação</span>
                  <span className="text-xs text-muted-foreground">Você recebeu uma nova avaliação de 5 estrelas</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              Ver todas as notificações
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DashboardSettings />
        <ThemeToggle />
      </div>
    </div>
  );
}
