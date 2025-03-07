
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, CircleDollarSign, Scissors, UserCheck, Filter } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

export function DashboardFilters() {
  const { toast } = useToast();
  
  const handleFilterSelect = (filter: string) => {
    toast({
      title: "Filtro aplicado",
      description: `Exibindo dados para: ${filter}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="ml-2">
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Filtrar Dashboard</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Calendar className="h-4 w-4 mr-2" />
              <span>Agendamentos</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleFilterSelect("Agendamentos de hoje")}>
                  Hoje
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("Agendamentos de amanhã")}>
                  Amanhã
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("Agendamentos desta semana")}>
                  Esta semana
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("Agendamentos deste mês")}>
                  Este mês
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <CircleDollarSign className="h-4 w-4 mr-2" />
              <span>Faturamento</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleFilterSelect("Faturamento diário")}>
                  Diário
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("Faturamento semanal")}>
                  Semanal
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("Faturamento mensal")}>
                  Mensal
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("Faturamento trimestral")}>
                  Trimestral
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("Faturamento anual")}>
                  Anual
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Scissors className="h-4 w-4 mr-2" />
              <span>Serviços</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleFilterSelect("Serviços de hoje")}>
                  Hoje
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("Serviços desta semana")}>
                  Esta semana
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("Serviços deste mês")}>
                  Este mês
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("Por tipo de serviço")}>
                  Por tipo
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserCheck className="h-4 w-4 mr-2" />
              <span>Clientes</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleFilterSelect("Novos clientes desta semana")}>
                  Novos esta semana
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("Novos clientes deste mês")}>
                  Novos este mês
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("Clientes mais frequentes")}>
                  Mais frequentes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterSelect("Clientes com corte grátis disponível")}>
                  Com corte grátis
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleFilterSelect("Personalizado")}>
          Filtro personalizado
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilterSelect("Limpar filtros")}>
          Limpar filtros
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
