
import React from "react";
import { 
  CalendarCheck, 
  CircleDollarSign, 
  Scissors, 
  UserCheck,
  Users,
  TrendingUp,
  MessageSquare,
  Star
} from "lucide-react";
import { StatisticCard } from "@/components/dashboard/StatisticCard";
import { AppointmentSchedule } from "@/components/dashboard/AppointmentSchedule";
import { ServicesList } from "@/components/dashboard/ServicesList";
import { ClientsList } from "@/components/dashboard/ClientsList";
import { TeamMembers } from "@/components/dashboard/TeamMembers";

const Index = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao seu painel de controle, aqui está o resumo do seu negócio.
        </p>
      </div>
      
      <div className="dashboard-grid">
        <StatisticCard
          title="Agendamentos Hoje"
          value="12"
          description="4 aguardando confirmação"
          icon={CalendarCheck}
          trend={{ value: 8, isPositive: true }}
          variant="primary"
        />
        <StatisticCard
          title="Faturamento Diário"
          value="R$ 1.320"
          description="42% do objetivo mensal"
          icon={CircleDollarSign}
          trend={{ value: 12, isPositive: true }}
          variant="success"
        />
        <StatisticCard
          title="Serviços Realizados"
          value="28"
          description="Esta semana"
          icon={Scissors}
          trend={{ value: 5, isPositive: false }}
          variant="info"
        />
        <StatisticCard
          title="Novos Clientes"
          value="8"
          description="Nos últimos 7 dias"
          icon={UserCheck}
          trend={{ value: 15, isPositive: true }}
          variant="warning"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentSchedule />
        <ServicesList />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClientsList />
        <div className="grid grid-cols-1 gap-6">
          <TeamMembers />
          <div className="dashboard-grid">
            <StatisticCard
              title="Total de Clientes"
              value="437"
              icon={Users}
            />
            <StatisticCard
              title="Taxa de Crescimento"
              value="18%"
              icon={TrendingUp}
            />
            <StatisticCard
              title="Mensagens"
              value="24"
              icon={MessageSquare}
            />
            <StatisticCard
              title="Avaliação Média"
              value="4.8"
              icon={Star}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
