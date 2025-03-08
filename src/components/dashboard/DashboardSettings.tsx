
import React from "react";
import { 
  Settings, 
  Bell, 
  Shield, 
  Users, 
  Layers, 
  Paintbrush, 
  Server, 
  Calendar, 
  BarChart3,
  Save,
  Keyboard
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function DashboardSettings() {
  const { toast } = useToast();
  
  const handleSettingSelect = (setting: string) => {
    toast({
      title: "Configuração selecionada",
      description: `Você selecionou: ${setting}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="ml-2">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Configurações do Dashboard</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Bell className="h-4 w-4 mr-2" />
              <span>Notificações</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleSettingSelect("Canais de notificação")}>
                  Canais de notificação
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSettingSelect("Horários de alerta")}>
                  Horários de alerta
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSettingSelect("Mensagens automáticas")}>
                  Mensagens automáticas
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Shield className="h-4 w-4 mr-2" />
              <span>Segurança</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleSettingSelect("Permissões de usuários")}>
                  Permissões de usuários
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSettingSelect("Verificação em duas etapas")}>
                  Verificação em duas etapas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSettingSelect("Logs de acesso")}>
                  Logs de acesso
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Users className="h-4 w-4 mr-2" />
              <span>Equipe</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleSettingSelect("Gerenciar funcionários")}>
                  Gerenciar funcionários
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSettingSelect("Escalas de trabalho")}>
                  Escalas de trabalho
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSettingSelect("Comissões")}>
                  Comissões
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Layers className="h-4 w-4 mr-2" />
              <span>Serviços</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleSettingSelect("Catálogo de serviços")}>
                  Catálogo de serviços
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSettingSelect("Preços e duração")}>
                  Preços e duração
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSettingSelect("Promoções")}>
                  Promoções
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Paintbrush className="h-4 w-4 mr-2" />
              <span>Aparência</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleSettingSelect("Cores e temas")}>
                  Cores e temas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSettingSelect("Layout do dashboard")}>
                  Layout do dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSettingSelect("Widgets visíveis")}>
                  Widgets visíveis
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Server className="h-4 w-4 mr-2" />
              <span>Sistema</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleSettingSelect("Backup de dados")}>
                  Backup de dados
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSettingSelect("Integrações")}>
                  Integrações
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSettingSelect("Verificar atualizações")}>
                  Verificar atualizações
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleSettingSelect("Atalhos de teclado")}>
          <Keyboard className="h-4 w-4 mr-2" />
          <span>Atalhos de teclado</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleSettingSelect("Salvar configurações")}>
          <Save className="h-4 w-4 mr-2" />
          <span>Salvar configurações</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
