
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { LucideIcon, ChevronDown, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const cardVariants = cva(
  "stat-card flex flex-col gap-2 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-card/80 hover:bg-card/90",
        primary: "bg-primary/10 hover:bg-primary/15 border-primary/20",
        success: "bg-green-500/10 hover:bg-green-500/15 border-green-500/20 text-green-700 dark:text-green-500",
        warning: "bg-orange-500/10 hover:bg-orange-500/15 border-orange-500/20 text-orange-700 dark:text-orange-500",
        info: "bg-blue-500/10 hover:bg-blue-500/15 border-blue-500/20 text-blue-700 dark:text-blue-500",
        danger: "bg-red-500/10 hover:bg-red-500/15 border-red-500/20 text-red-700 dark:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface FilterOption {
  label: string;
  value: string;
}

type StatisticCardFilter = {
  agendamentos?: FilterOption[];
  faturamento?: FilterOption[];
  servicos?: FilterOption[];
  clientes?: FilterOption[];
  [key: string]: FilterOption[] | undefined;
};

// Predefined filter options based on card type
const filterOptions: StatisticCardFilter = {
  agendamentos: [
    { label: "Hoje", value: "hoje" },
    { label: "Amanhã", value: "amanha" },
    { label: "Esta semana", value: "semana" },
    { label: "Este mês", value: "mes" },
  ],
  faturamento: [
    { label: "Diário", value: "diario" },
    { label: "Semanal", value: "semanal" },
    { label: "Mensal", value: "mensal" },
    { label: "Trimestral", value: "trimestral" },
    { label: "Anual", value: "anual" },
  ],
  servicos: [
    { label: "Hoje", value: "hoje" },
    { label: "Esta semana", value: "semana" },
    { label: "Este mês", value: "mes" },
    { label: "Por tipo", value: "tipo" },
  ],
  clientes: [
    { label: "Novos esta semana", value: "novos_semana" },
    { label: "Novos este mês", value: "novos_mes" },
    { label: "Mais frequentes", value: "frequentes" },
    { label: "Com corte grátis", value: "corte_gratis" },
  ],
};

interface StatisticCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning" | "info" | "danger";
  className?: string;
  filterType?: keyof StatisticCardFilter;
}

export function StatisticCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
  className,
  filterType,
}: StatisticCardProps) {
  const { toast } = useToast();
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);
  
  const handleFilterSelect = (filterLabel: string) => {
    setCurrentFilter(filterLabel);
    toast({
      title: "Filtro aplicado",
      description: `${title}: ${filterLabel}`,
    });
  };

  return (
    <div className={cn(cardVariants({ variant }), className)}>
      <div className="absolute -right-3 -top-3 opacity-10">
        <Icon size={60} />
      </div>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-center space-x-1">
          <div className="rounded-full bg-background/50 p-1.5">
            <Icon className="h-4 w-4" />
          </div>
          
          {filterType && filterOptions[filterType] && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {filterOptions[filterType].map((option) => (
                  <DropdownMenuItem 
                    key={option.value}
                    onClick={() => handleFilterSelect(option.label)}
                  >
                    {currentFilter === option.label && (
                      <ChevronRight className="mr-1 h-3.5 w-3.5" />
                    )}
                    {option.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setCurrentFilter(null)}>
                  Limpar filtro
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trend.isPositive
                ? "text-green-500"
                : "text-red-500"
            )}
          >
            {trend.isPositive ? "+" : "-"}
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <div>
        {currentFilter ? (
          <p className="text-xs text-muted-foreground">
            Filtro: <span className="font-medium">{currentFilter}</span>
          </p>
        ) : description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
