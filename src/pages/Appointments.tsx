
import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  User, 
  CircleDollarSign,
  Scissors,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  TimerOff,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data for appointments
const APPOINTMENTS = [
  {
    id: 1,
    client: "João Silva",
    service: "Corte + Barba",
    date: "2023-06-12",
    time: "09:30",
    duration: 60,
    price: 75,
    status: "confirmed",
    barber: "André Silva",
    phone: "(11) 98765-4321",
    notes: "Cliente prefere tesoura no topo",
    avatar: "https://ui-avatars.com/api/?name=João+Silva&background=random",
  },
  {
    id: 2,
    client: "Carlos Santos",
    service: "Corte Degradê",
    date: "2023-06-12",
    time: "11:00",
    duration: 30,
    price: 45,
    status: "confirmed",
    barber: "Marcos Souza",
    phone: "(11) 91234-5678",
    notes: "",
    avatar: "https://ui-avatars.com/api/?name=Carlos+Santos&background=random",
  },
  {
    id: 3,
    client: "Rodrigo Lima",
    service: "Barba",
    date: "2023-06-12",
    time: "13:30",
    duration: 30,
    price: 35,
    status: "pending",
    barber: "André Silva",
    phone: "(11) 95555-1234",
    notes: "Primeira vez no estabelecimento",
    avatar: "https://ui-avatars.com/api/?name=Rodrigo+Lima&background=random",
  },
  {
    id: 4,
    client: "Marcelo Costa",
    service: "Platinado",
    date: "2023-06-12",
    time: "14:30",
    duration: 120,
    price: 180,
    status: "canceled",
    barber: "Rodrigo Almeida",
    phone: "(11) 92222-3333",
    notes: "Cliente remarcou para a próxima semana",
    avatar: "https://ui-avatars.com/api/?name=Marcelo+Costa&background=random",
  },
  {
    id: 5,
    client: "Felipe Oliveira",
    service: "Corte Tesoura",
    date: "2023-06-12",
    time: "16:00",
    duration: 45,
    price: 55,
    status: "confirmed",
    barber: "Marcos Souza",
    phone: "(11) 97777-8888",
    notes: "",
    avatar: "https://ui-avatars.com/api/?name=Felipe+Oliveira&background=random",
  },
  {
    id: 6,
    client: "Bruno Alves",
    service: "Corte + Barba",
    date: "2023-06-13",
    time: "10:00",
    duration: 60,
    price: 75,
    status: "confirmed",
    barber: "André Silva",
    phone: "(11) 93333-4444",
    notes: "",
    avatar: "https://ui-avatars.com/api/?name=Bruno+Alves&background=random",
  },
];

// The time slots for the scheduler
const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
];

// Get status badge styles
const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-500 border-green-500/20">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Confirmado
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 border-yellow-500/20">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pendente
        </Badge>
      );
    case "canceled":
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-700 dark:text-red-500 border-red-500/20">
          <TimerOff className="h-3 w-3 mr-1" />
          Cancelado
        </Badge>
      );
    default:
      return null;
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedDate, setSelectedDate] = useState("2023-06-12");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter appointments by date and search term
  const filteredAppointments = APPOINTMENTS.filter(appointment => 
    appointment.date === selectedDate && 
    (appointment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
     appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
     appointment.barber.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handlePrevDay = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 1);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };
  
  const handleNextDay = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Agenda de Atendimentos</h1>
        <p className="text-muted-foreground">
          Gerencie seus agendamentos e visualize sua agenda do dia.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Tabs defaultValue="list" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="list" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Lista</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Agenda</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrevDay}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextDay}>
            Próximo
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Novo
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
            <h2 className="font-medium">{formatDate(selectedDate)}</h2>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          {activeTab === "list" ? (
            <div className="divide-y">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <img 
                            src={appointment.avatar}
                            alt={appointment.client}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{appointment.client}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.service}</p>
                        </div>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{appointment.time}</p>
                          <p className="text-xs text-muted-foreground">{appointment.duration} min</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{appointment.barber}</p>
                          <p className="text-xs text-muted-foreground">Profissional</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Scissors className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{appointment.service}</p>
                          <p className="text-xs text-muted-foreground">Serviço</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <CircleDollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">R$ {appointment.price}</p>
                          <p className="text-xs text-muted-foreground">Valor</p>
                        </div>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <div className="mt-3 p-2 bg-muted/30 rounded-md text-sm">
                        <p className="text-muted-foreground">{appointment.notes}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-end mt-3 gap-2">
                      <Button variant="outline" size="sm">Detalhes</Button>
                      <Button size="sm">Editar</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium mb-1">Nenhum agendamento encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Não há agendamentos para esta data ou sua busca não retornou resultados.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    Novo Agendamento
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card className="p-3 bg-primary/5 border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">André Silva</h3>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Barbeiro Master
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    Especialidades: Degradê, Barba
                  </div>
                </Card>
                
                <Card className="p-3 bg-muted">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">Marcos Souza</h3>
                    <Badge variant="outline" className="bg-muted text-muted-foreground border-muted-foreground/20">
                      Barbeiro
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    Especialidades: Corte Tesoura, Tratamentos
                  </div>
                </Card>
                
                <Card className="p-3 bg-muted">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">Rodrigo Almeida</h3>
                    <Badge variant="outline" className="bg-muted text-muted-foreground border-muted-foreground/20">
                      Barbeiro Senior
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    Especialidades: Platinado, Design de Barba
                  </div>
                </Card>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border text-left text-xs font-medium text-muted-foreground">Horário</th>
                      <th className="p-2 border text-left text-xs font-medium text-muted-foreground">André Silva</th>
                      <th className="p-2 border text-left text-xs font-medium text-muted-foreground">Marcos Souza</th>
                      <th className="p-2 border text-left text-xs font-medium text-muted-foreground">Rodrigo Almeida</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TIME_SLOTS.map((timeSlot) => {
                      // Appointments for this time slot
                      const appointments = APPOINTMENTS.filter(
                        a => a.date === selectedDate && a.time === timeSlot
                      );
                      
                      return (
                        <tr key={timeSlot} className="hover:bg-muted/50">
                          <td className="p-2 border text-sm">{timeSlot}</td>
                          
                          {["André Silva", "Marcos Souza", "Rodrigo Almeida"].map((barber) => {
                            const appointment = appointments.find(a => a.barber === barber);
                            
                            return (
                              <td key={barber} className="p-2 border relative min-h-[60px]">
                                {appointment ? (
                                  <div className={cn(
                                    "p-2 rounded-md text-xs h-full",
                                    appointment.status === "confirmed" && "bg-green-500/10 border border-green-500/20",
                                    appointment.status === "pending" && "bg-yellow-500/10 border border-yellow-500/20",
                                    appointment.status === "canceled" && "bg-red-500/10 border border-red-500/20",
                                  )}>
                                    <div className="font-medium mb-1">{appointment.client}</div>
                                    <div className="text-muted-foreground">{appointment.service}</div>
                                    <div className="mt-1">{appointment.duration} min</div>
                                  </div>
                                ) : (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="w-full h-full justify-center opacity-0 hover:opacity-100 transition-opacity"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
