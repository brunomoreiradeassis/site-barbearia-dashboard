
import React from "react";
import { 
  Bell, 
  UserPlus, 
  MessageCircle, 
  Calendar, 
  Users, 
  Award,
  Activity, 
  ChevronRight,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: 'client' | 'message' | 'appointment' | 'team' | 'loyalty' | 'service';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export function NotificationsCard() {
  const { toast } = useToast();
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      type: 'client',
      title: 'Novo Cliente',
      description: 'Maria Silva acabou de se cadastrar',
      time: 'Agora mesmo',
      read: false
    },
    {
      id: '2',
      type: 'message',
      title: 'Nova Mensagem',
      description: 'João perguntou sobre horários disponíveis',
      time: '5 min atrás',
      read: false
    },
    {
      id: '3',
      type: 'appointment',
      title: 'Agendamento Confirmado',
      description: 'Carlos confirmou o horário das 14h',
      time: '15 min atrás',
      read: false
    },
    {
      id: '4',
      type: 'team',
      title: 'Atualização da Equipe',
      description: 'Ana está disponível para serviços extras',
      time: '1 hora atrás',
      read: true
    },
    {
      id: '5',
      type: 'loyalty',
      title: 'Bônus de Fidelidade',
      description: 'Patrícia ganhou um corte grátis',
      time: '3 horas atrás',
      read: true
    },
    {
      id: '6',
      type: 'service',
      title: 'Novo Serviço',
      description: 'Tratamento capilar adicionado ao catálogo',
      time: '5 horas atrás',
      read: true
    },
  ]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'client':
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case 'message':
        return <MessageCircle className="h-4 w-4 text-purple-500" />;
      case 'appointment':
        return <Calendar className="h-4 w-4 text-green-500" />;
      case 'team':
        return <Users className="h-4 w-4 text-orange-500" />;
      case 'loyalty':
        return <Award className="h-4 w-4 text-yellow-500" />;
      case 'service':
        return <Activity className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    toast({
      title: "Notificação marcada como lida",
      description: "A notificação foi marcada como lida com sucesso",
    });
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
    toast({
      title: "Notificação removida",
      description: "A notificação foi removida com sucesso",
    });
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
    toast({
      title: "Todas notificações lidas",
      description: "Todas as notificações foram marcadas como lidas",
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="border-border/40 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notificações
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs font-bold text-white bg-primary rounded-full">
              {unreadCount}
            </span>
          )}
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs"
          onClick={markAllAsRead}
        >
          Marcar todas como lidas
        </Button>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4 max-h-96 overflow-y-auto pr-1 scrollbar-none">
          {notifications.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              Nenhuma notificação para exibir
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={cn(
                  "relative flex items-start space-x-3 px-3 py-2.5 rounded-lg transition-all",
                  notification.read 
                    ? "bg-muted/30" 
                    : "bg-primary/5 border-l-2 border-primary"
                )}
              >
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className={cn(
                      "text-sm font-medium",
                      !notification.read && "font-semibold"
                    )}>
                      {notification.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {notification.description}
                  </p>
                  {!notification.read && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs mt-1 h-6 px-2 text-primary"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Marcar como lida <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => dismissNotification(notification.id)}
                >
                  <X className="h-3.5 w-3.5" />
                  <span className="sr-only">Descartar</span>
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
