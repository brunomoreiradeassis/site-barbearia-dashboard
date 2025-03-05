
import React, { useState } from "react";
import { 
  Bell, 
  Calendar, 
  MessageSquare, 
  Percent, 
  AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    title: "Novo agendamento",
    message: "João confirmou para 14:30 hoje",
    time: "10 minutos atrás",
    icon: Calendar,
    read: false,
  },
  {
    id: 2,
    title: "Promoção ativa",
    message: "Pacote verão com 20% de desconto",
    time: "2 horas atrás",
    icon: Percent,
    read: false,
  },
  {
    id: 3,
    title: "Mensagem de cliente",
    message: "Carlos: Posso remarcar para amanhã?",
    time: "5 horas atrás",
    icon: MessageSquare,
    read: true,
  },
  {
    id: 4,
    title: "Alerta de sistema",
    message: "Sincronização completa com sucesso",
    time: "1 dia atrás",
    icon: AlertCircle,
    read: true,
  },
];

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  
  const unreadCount = notifs.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground animate-scale-in">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-medium">Notificações</h4>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead} 
              className="text-xs h-8"
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifs.length > 0 ? (
            <div className="divide-y">
              {notifs.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "flex items-start gap-3 p-4 transition-colors hover:bg-muted/50",
                      !notification.read && "bg-accent/10"
                    )}
                  >
                    <div className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                      notification.read ? "bg-muted" : "bg-primary/10"
                    )}>
                      <Icon className={cn(
                        "h-5 w-5",
                        notification.read ? "text-muted-foreground" : "text-primary"
                      )} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
                <Bell className="h-6 w-6 text-muted-foreground" />
              </div>
              <h4 className="text-sm font-medium mb-1">Sem notificações</h4>
              <p className="text-xs text-muted-foreground">
                Você não tem nenhuma notificação no momento.
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
