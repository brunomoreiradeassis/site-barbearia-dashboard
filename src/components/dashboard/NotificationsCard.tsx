
import React from "react";
import { Bell, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NotificationsCard() {
  const unreadCount = 3;

  return (
    <Card className="border-border/40 shadow-md">
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
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3 max-h-20 overflow-y-auto">
          <div className="bg-primary/5 border-l-2 border-primary px-3 py-2 rounded-lg">
            <p className="text-sm font-medium">Novo Cliente</p>
            <p className="text-xs text-muted-foreground">Maria Silva acabou de se cadastrar</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-xs justify-between"
          >
            Ver todas <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
