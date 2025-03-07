
import React, { useState } from "react";
import { Bell, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function NotificationSettings() {
  const [confirmationAlert, setConfirmationAlert] = useState(true);
  const [nextClientAlert, setNextClientAlert] = useState(true);
  const [reminderAlert, setReminderAlert] = useState(true);
  const [alertTimeMinutes, setAlertTimeMinutes] = useState(15);
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

      <div className="p-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5 text-amber-500" />
                <Label htmlFor="confirmation-alert" className="font-medium">
                  Verificação de presença ({alertTimeMinutes} min antes)
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

          <div className="mt-4">
            <Button onClick={handleSaveSettings} className="w-full">
              Salvar Configurações
            </Button>
          </div>
        </div>
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
