
import React, { useState } from "react";
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
import { LoyaltyTracker } from "@/components/dashboard/LoyaltyTracker";
import { NotificationsCard } from "@/components/dashboard/NotificationsCard";
import { AnalyticsReport } from "@/components/dashboard/AnalyticsReport";
import { PaymentManagement } from "@/components/dashboard/PaymentManagement";
import { InventoryManagement } from "@/components/dashboard/InventoryManagement";
import { CustomerFeedback } from "@/components/dashboard/CustomerFeedback";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-4 border-b">
        <div className="flex flex-col p-2">
          <div className="space-y-2">
            <h1 className="dashboard-title">
              Painel de Controle
            </h1>
            <p className="text-sm text-muted-foreground font-medium max-w-2xl">
              Bem-vindo ao seu sistema de gestão. Acompanhe métricas, agendamentos e desempenho do seu negócio.
            </p>
          </div>
        </div>
      </div>
      
      <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <Tabs value={activeTab} className="w-full">
        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="mt-0">
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
          
          <AnalyticsReport />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AppointmentSchedule />
            <div className="grid grid-cols-1 gap-6">
              <NotificationsCard />
              <ServicesList />
            </div>
          </div>
        </TabsContent>
        
        {/* Payments Tab */}
        <TabsContent value="payments" className="mt-0">
          <PaymentManagement />
        </TabsContent>
        
        {/* Inventory Tab */}
        <TabsContent value="inventory" className="mt-0">
          <InventoryManagement />
        </TabsContent>
        
        {/* Feedback Tab */}
        <TabsContent value="feedback" className="mt-0">
          <CustomerFeedback />
        </TabsContent>
        
        {/* Appointments Tab */}
        <TabsContent value="appointments" className="mt-0">
          <AppointmentSchedule showFullCalendar={true} />
        </TabsContent>
        
        {/* Team Tab */}
        <TabsContent value="team" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <TeamMembers showAllMembers={true} />
            <div className="dashboard-grid">
              <StatisticCard
                title="Total de Membros"
                value="8"
                icon={Users}
              />
              <StatisticCard
                title="Produtividade"
                value="92%"
                icon={TrendingUp}
              />
              <StatisticCard
                title="Comissões"
                value="R$ 4.850"
                icon={CircleDollarSign}
              />
              <StatisticCard
                title="Avaliação Média"
                value="4.7"
                icon={Star}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
