
import React, { useState } from "react";
import { Bell, Clock, CheckCircle, AlertTriangle, Settings, MessageSquare, Phone, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function NotificationSettings() {
  const [confirmationAlert, setConfirmationAlert] = useState(true);
  const [nextClientAlert, setNextClientAlert] = useState(true);
  const [reminderAlert, setReminderAlert] = useState(true);
  const [alertTimeMinutes, setAlertTimeMinutes] = useState(15);
  const [notificationChannel, setNotificationChannel] = useState("whatsapp");
  const [loyaltyNotifications, setLoyaltyNotifications] = useState(true);
  const [ratingRequests, setRatingRequests] = useState(true);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas preferências de notificação foram atualizadas.",
      variant: "default",
    });
  };

  // Mock pending notification
  const pendingNotification = {
    client: "Carlos Silva",
    time: "11:30",
    confirmationStatus: "pending",
    nextClient: "André Martins",
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-primary" />
          <h3 className="font-semibold">Alertas de Agendamentos</h3>
        </div>
      </div>

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid grid-cols-3 mx-4 mt-4">
          <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
          <TabsTrigger value="channels">Canais</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appointments" className="p-4 pt-2">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-amber-500" />
                  <Label htmlFor="confirmation-alert" className="font-medium">
                    Verificação de presença
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Enviar lembrete para cliente confirmar presença antes do horário
                </p>
              </div>
              <Switch
                id="confirmation-alert"
                checked={confirmationAlert}
                onCheckedChange={setConfirmationAlert}
              />
            </div>

            {confirmationAlert && (
              <div className="pl-6 flex items-center space-x-2">
                <Label htmlFor="alert-time" className="text-sm">Tempo:</Label>
                <Select 
                  value={alertTimeMinutes.toString()} 
                  onValueChange={(value) => setAlertTimeMinutes(parseInt(value))}
                >
                  <SelectTrigger id="alert-time" className="w-24 h-8">
                    <SelectValue placeholder="Tempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 min</SelectItem>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1.5 text-green-500" />
                  <Label htmlFor="next-client-alert" className="font-medium">
                    Aviso para próximo cliente
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Notificar próximo cliente se o atual não confirmar presença
                </p>
              </div>
              <Switch
                id="next-client-alert"
                checked={nextClientAlert}
                onCheckedChange={setNextClientAlert}
              />
            </div>

            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Bell className="h-4 w-4 mr-1.5 text-blue-500" />
                  <Label htmlFor="reminder-alert" className="font-medium">
                    Lembrete de agendamento
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Enviar lembrete no dia anterior ao agendamento
                </p>
              </div>
              <Switch
                id="reminder-alert"
                checked={reminderAlert}
                onCheckedChange={setReminderAlert}
              />
            </div>

            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Gift className="h-4 w-4 mr-1.5 text-purple-500" />
                  <Label htmlFor="loyalty-notifications" className="font-medium">
                    Notificações de fidelidade
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Alertar clientes sobre cortes gratuitos disponíveis
                </p>
              </div>
              <Switch
                id="loyalty-notifications"
                checked={loyaltyNotifications}
                onCheckedChange={setLoyaltyNotifications}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="channels" className="p-4 pt-2">
          <div className="space-y-4">
            <div className="mb-4">
              <Label htmlFor="notification-channel" className="block mb-2">Canal principal de notificação</Label>
              <Select 
                value={notificationChannel} 
                onValueChange={setNotificationChannel}
              >
                <SelectTrigger id="notification-channel">
                  <SelectValue placeholder="Selecione um canal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-green-500" />
                      WhatsApp
                    </div>
                  </SelectItem>
                  <SelectItem value="sms">
                    <div className="flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4 text-blue-500" />
                      SMS
                    </div>
                  </SelectItem>
                  <SelectItem value="email">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-amber-500" />
                      E-mail
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1.5 text-amber-500" />
                  <Label htmlFor="rating-requests" className="font-medium">
                    Solicitação de avaliação
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Solicitar avaliação após o atendimento
                </p>
              </div>
              <Switch
                id="rating-requests"
                checked={ratingRequests}
                onCheckedChange={setRatingRequests}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="p-4 pt-2">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-1.5 text-slate-500" />
                  <Label className="font-medium">Notificações automáticas</Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Configurar regras automáticas para notificações
                </p>
              </div>
              <Button variant="outline" size="sm">Configurar</Button>
            </div>
            
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-1.5 text-slate-500" />
                  <Label className="font-medium">Modelo de mensagens</Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Personalizar mensagens enviadas aos clientes
                </p>
              </div>
              <Button variant="outline" size="sm">Editar</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Separator />
      
      <div className="p-4">
        <Button onClick={handleSaveSettings} className="w-full">
          Salvar Configurações
        </Button>
      </div>

      <Separator />

      <div className="p-4">
        <h4 className="text-sm font-medium mb-3">Alerta Pendente</h4>
        
        <div className={cn(
          "p-3 rounded-md border bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
        )}>
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {pendingNotification.client} - {pendingNotification.time}
              </p>
              <p className="text-xs text-muted-foreground">
                Aguardando confirmação. Se não confirmar nos próximos 10 minutos, 
                {nextClientAlert ? ` ${pendingNotification.nextClient} será notificado como próximo.` : ' nenhuma ação será tomada.'}
              </p>
              <div className="flex space-x-2 mt-2">
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  Confirmar Manualmente
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
