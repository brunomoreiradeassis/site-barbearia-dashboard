import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, TrendingUp, RefreshCw, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Dados de exemplo para os gráficos
const monthlyRevenue = [
  { name: "Jan", value: 1420 },
  { name: "Fev", value: 1520 },
  { name: "Mar", value: 1700 },
  { name: "Abr", value: 1800 },
  { name: "Mai", value: 1900 },
  { name: "Jun", value: 2100 },
  { name: "Jul", value: 1950 },
  { name: "Ago", value: 2300 },
  { name: "Set", value: 2400 },
  { name: "Out", value: 2550 },
  { name: "Nov", value: 2700 },
  { name: "Dez", value: 2900 },
];

const popularServices = [
  { name: "Corte Masculino", value: 42 },
  { name: "Barba", value: 28 },
  { name: "Corte e Barba", value: 18 },
  { name: "Corte Feminino", value: 8 },
  { name: "Coloração", value: 4 },
];

const weeklyAppointments = [
  { name: "Seg", value: 12 },
  { name: "Ter", value: 15 },
  { name: "Qua", value: 18 },
  { name: "Qui", value: 20 },
  { name: "Sex", value: 25 },
  { name: "Sáb", value: 30 },
  { name: "Dom", value: 0 },
];

const professionalData = [
  { name: "João Silva", haircuts: 32, beard: 18, color: 5, total: 55 },
  { name: "Maria Oliveira", haircuts: 28, beard: 0, color: 12, total: 40 },
  { name: "Pedro Santos", haircuts: 25, beard: 20, color: 0, total: 45 },
  { name: "Ana Souza", haircuts: 22, beard: 0, color: 15, total: 37 },
  { name: "Carlos Ferreira", haircuts: 18, beard: 12, color: 0, total: 30 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function AnalyticsReport() {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState("monthly");
  const [chartType, setChartType] = useState("revenue");
  const [reportView, setReportView] = useState("charts");

  const handleExportReport = () => {
    toast({
      title: "Relatório exportado",
      description: "O relatório foi exportado para download no formato PDF.",
    });
  };

  const handleRefreshData = () => {
    toast({
      title: "Dados atualizados",
      description: "Os dados foram atualizados com as informações mais recentes.",
    });
  };

  return (
    <Card className="border-border/40 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Relatórios e Análises
        </CardTitle>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px] h-8 text-xs">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="quarterly">Trimestral</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportReport}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <Tabs defaultValue="charts" value={reportView} onValueChange={setReportView} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="charts">Gráficos</TabsTrigger>
              <TabsTrigger value="professionals">Profissionais</TabsTrigger>
              <TabsTrigger value="predictions">Previsões</TabsTrigger>
            </TabsList>
            
            {reportView === "charts" && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="ml-auto">
                  {timeRange === "weekly" ? "Esta Semana" : 
                   timeRange === "monthly" ? "Este Mês" : 
                   timeRange === "quarterly" ? "Este Trimestre" : "Este Ano"}
                </Badge>
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="w-[150px] h-8 text-xs">
                    <SelectValue placeholder="Tipo de Gráfico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Faturamento</SelectItem>
                    <SelectItem value="services">Serviços Populares</SelectItem>
                    <SelectItem value="appointments">Agendamentos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          
          <TabsContent value="charts" className="space-y-4">
            <div className="bg-card rounded-md p-4 h-[350px]">
              {chartType === "revenue" && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyRevenue}
                    margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `R$${value}`} />
                    <Tooltip 
                      formatter={(value) => [`R$ ${value}`, "Faturamento"]}
                      labelFormatter={(label) => `Mês: ${label}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Faturamento"
                      stroke="#8884d8"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
              
              {chartType === "services" && (
                <ResponsiveContainer width="100%" height="100%">
                  <div className="flex flex-col md:flex-row items-center justify-center h-full">
                    <PieChart width={250} height={250}>
                      <Pie
                        data={popularServices}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {popularServices.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} agendamentos`, "Quantidade"]} />
                    </PieChart>
                    
                    <div className="flex flex-col mt-4 md:mt-0 md:ml-6">
                      <h3 className="text-base font-medium mb-2">Distribuição de Serviços</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {popularServices.map((service, index) => (
                          <div key={service.name} className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-sm">
                              {service.name}: <strong>{service.value}</strong>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ResponsiveContainer>
              )}
              
              {chartType === "appointments" && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyAppointments}
                    margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} agendamentos`, "Quantidade"]}
                      labelFormatter={(label) => `Dia: ${label}`}
                    />
                    <Legend />
                    <Bar 
                      dataKey="value" 
                      name="Agendamentos" 
                      fill="#4f46e5"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-primary/10 hover:bg-primary/15 border-primary/20">
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">Total de Faturamento</div>
                  <div className="text-2xl font-bold mt-1">R$ 22.840</div>
                  <div className="text-xs text-green-500 font-medium mt-1">+15% em relação ao período anterior</div>
                </CardContent>
              </Card>
              
              <Card className="bg-green-500/10 hover:bg-green-500/15 border-green-500/20">
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">Ticket Médio</div>
                  <div className="text-2xl font-bold mt-1">R$ 75,50</div>
                  <div className="text-xs text-green-500 font-medium mt-1">+5% em relação ao período anterior</div>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-500/10 hover:bg-blue-500/15 border-blue-500/20">
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">Novos Clientes</div>
                  <div className="text-2xl font-bold mt-1">38</div>
                  <div className="text-xs text-green-500 font-medium mt-1">+12% em relação ao período anterior</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          
          <TabsContent value="professionals" className="space-y-4">
            <div className="rounded-md overflow-hidden border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-medium">Profissional</th>
                    <th className="text-center p-3 font-medium">Cortes</th>
                    <th className="text-center p-3 font-medium">Barbas</th>
                    <th className="text-center p-3 font-medium">Coloração</th>
                    <th className="text-center p-3 font-medium">Total Atendimentos</th>
                    <th className="text-center p-3 font-medium">Faturamento</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {professionalData.map((professional, index) => (
                    <tr key={professional.name} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                      <td className="p-3">{professional.name}</td>
                      <td className="text-center p-3">{professional.haircuts}</td>
                      <td className="text-center p-3">{professional.beard}</td>
                      <td className="text-center p-3">{professional.color}</td>
                      <td className="text-center p-3 font-medium">{professional.total}</td>
                      <td className="text-center p-3 font-medium">
                        R$ {(professional.haircuts * 40 + professional.beard * 25 + professional.color * 70).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={professionalData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="haircuts" name="Cortes" fill="#8884d8" stackId="a" />
                  <Bar dataKey="beard" name="Barbas" fill="#82ca9d" stackId="a" />
                  <Bar dataKey="color" name="Coloração" fill="#ffc658" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          
          <TabsContent value="predictions" className="space-y-4">
            <div className="bg-card rounded-md p-6">
              <h3 className="text-lg font-semibold mb-4">Previsão de Faturamento</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      ...monthlyRevenue, 
                      { name: "Jan (prev)", value: 3050, dotted: true },
                      { name: "Fev (prev)", value: 3200, dotted: true },
                      { name: "Mar (prev)", value: 3350, dotted: true }
                    ]}
                    margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `R$${value}`} />
                    <Tooltip 
                      formatter={(value) => [`R$ ${value}`, "Faturamento"]}
                      labelFormatter={(label) => `Mês: ${label}`}
                    />
                    <Legend />
                    {/* Fix: Replace the function with two separate Line components */}
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Faturamento Atual"
                      stroke="#8884d8"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      connectNulls
                      dot={(props) => {
                        const { payload } = props;
                        if (payload.dotted) {
                          return <circle {...props} r={6} fill="#8884d8" />;
                        }
                        return <circle {...props} r={4} fill="#8884d8" />;
                      }}
                    />
                    {/* Add a separate dashed line for predicted values */}
                    <Line
                      type="monotone"
                      dataKey={(data) => data.dotted ? data.value : null}
                      name="Faturamento Previsto"
                      stroke="#8884d8"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }}
                      connectNulls
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <Card className="shadow-sm border-primary/20">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-muted-foreground">Previsão Próximo Mês</div>
                    <div className="text-2xl font-bold mt-1">R$ 3.050</div>
                    <div className="text-xs text-green-500 font-medium mt-1">+5,1% em relação ao mês atual</div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm border-primary/20">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-muted-foreground">Previsão Próximo Trimestre</div>
                    <div className="text-2xl font-bold mt-1">R$ 9.600</div>
                    <div className="text-xs text-green-500 font-medium mt-1">+10,3% em relação ao trimestre atual</div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm border-primary/20">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-muted-foreground">Tendência Anual</div>
                    <div className="text-2xl font-bold mt-1">Crescimento</div>
                    <div className="text-xs text-green-500 font-medium mt-1">Projeção de +15% no ano</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-muted/30 rounded-md p-4 mt-6">
                <h4 className="text-sm font-medium mb-2">Recomendações Baseadas em Dados</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                    <span>Aumente a oferta de serviços combinados de corte e barba, que mostram tendência de crescimento.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                    <span>Os agendamentos de sexta e sábado estão próximos da capacidade máxima. Considere adicionar mais profissionais nesses dias.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                    <span>O ticket médio pode ser aumentado com a oferta de produtos para venda direta aos clientes.</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
