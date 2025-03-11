
import React from "react";
import { 
  CalendarCheck, 
  CircleDollarSign, 
  Scissors, 
  UserCheck,
  Users,
  TrendingUp,
  MessageSquare,
  Star,
  Gift,
  Package
} from "lucide-react";
import { StatisticCard } from "@/components/dashboard/StatisticCard";
import { AppointmentSchedule } from "@/components/dashboard/AppointmentSchedule";
import { ServicesList } from "@/components/dashboard/ServicesList";
import { ClientsList } from "@/components/dashboard/ClientsList";
import { TeamMembers } from "@/components/dashboard/TeamMembers";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LoyaltyTracker } from "@/components/dashboard/LoyaltyTracker";
import { NotificationSettings } from "@/components/dashboard/NotificationSettings";
import { DashboardSettings } from "@/components/dashboard/DashboardSettings";
import { NotificationsCard } from "@/components/dashboard/NotificationsCard";
import { AnalyticsReport } from "@/components/dashboard/AnalyticsReport";
import { PaymentManagement } from "@/components/dashboard/PaymentManagement";
import { InventoryManagement } from "@/components/dashboard/InventoryManagement";

const Index = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-4 border-b">
        <div className="flex justify-between items-center p-2">
          <div className="space-y-2">
            <h1 className="dashboard-title">
              Painel de Controle
            </h1>
            <p className="text-sm text-muted-foreground font-medium max-w-2xl">
              Bem-vindo ao seu sistema de gestão. Acompanhe métricas, agendamentos e desempenho do seu negócio.
            </p>
          </div>
          <div className="flex items-center space-x-2 pr-4">
            <DashboardSettings />
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <StatisticCard
          title="Agendamentos Hoje"
          value="12"
          description="4 aguardando confirmação"
          icon={CalendarCheck}
          trend={{ value: 8, isPositive: true }}
          variant="primary"
          filterType="agendamentos"
        />
        <StatisticCard
          title="Faturamento Diário"
          value="R$ 1.320"
          description="42% do objetivo mensal"
          icon={CircleDollarSign}
          trend={{ value: 12, isPositive: true }}
          variant="success"
          filterType="faturamento"
        />
        <StatisticCard
          title="Serviços Realizados"
          value="28"
          description="Esta semana"
          icon={Scissors}
          trend={{ value: 5, isPositive: false }}
          variant="info"
          filterType="servicos"
        />
        <StatisticCard
          title="Novos Clientes"
          value="8"
          description="Nos últimos 7 dias"
          icon={UserCheck}
          trend={{ value: 15, isPositive: true }}
          variant="warning"
          filterType="clientes"
        />
      </div>
      
      {/* Relatórios e Análises */}
      <AnalyticsReport />
      
      {/* Nova seção de Gestão de Pagamentos */}
      <PaymentManagement />
      
      {/* Nova seção de Gestão de Inventário */}
      <InventoryManagement />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentSchedule />
        <div className="grid grid-cols-1 gap-6">
          <NotificationsCard />
          <ServicesList />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClientsList />
        <div className="grid grid-cols-1 gap-6">
          <TeamMembers />
          <LoyaltyTracker />
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
