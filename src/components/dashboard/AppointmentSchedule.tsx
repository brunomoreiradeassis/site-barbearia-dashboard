import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, User, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

// Define the AppointmentStatus type first
type AppointmentStatus = "confirmed" | "pending" | "canceled";

// Mock appointments data
const TODAY = new Date();
const TOMORROW = new Date(TODAY);
TOMORROW.setDate(TODAY.getDate() + 1);

const APPOINTMENTS = [
  {
    id: 1,
    client: "Carlos Silva",
    service: "Corte + Barba",
    date: TODAY,
    time: "09:30",
    duration: 60,
    status: "confirmed" as AppointmentStatus,
    avatar: "https://ui-avatars.com/api/?name=Carlos+Silva&background=random",
  },
  {
    id: 2,
    client: "André Martins",
    service: "Corte Degradê",
    date: TODAY,
    time: "11:00",
    duration: 30,
    status: "confirmed" as AppointmentStatus,
    avatar: "https://ui-avatars.com/api/?name=André+Martins&background=random",
  },
  {
    id: 3,
    client: "Rodrigo Lima",
    service: "Barba",
    date: TODAY,
    time: "14:15",
    duration: 30,
    status: "pending" as AppointmentStatus,
    avatar: "https://ui-avatars.com/api/?name=Rodrigo+Lima&background=random",
  },
  {
    id: 4,
    client: "Felipe Costa",
    service: "Corte Completo",
    date: TODAY,
    time: "16:00",
    duration: 45,
    status: "canceled" as AppointmentStatus,
    avatar: "https://ui-avatars.com/api/?name=Felipe+Costa&background=random",
  },
  {
    id: 5,
    client: "Lucas Mendes",
    service: "Corte + Barba",
    date: TOMORROW,
    time: "10:00",
    duration: 60,
    status: "confirmed" as AppointmentStatus,
    avatar: "https://ui-avatars.com/api/?name=Lucas+Mendes&background=random",
  },
  {
    id: 6,
    client: "Vinícius Alves",
    service: "Corte Tesoura",
    date: TOMORROW,
    time: "13:30",
    duration: 45,
    status: "pending" as AppointmentStatus,
    avatar: "https://ui-avatars.com/api/?name=Vinícius+Alves&background=random",
  },
];

const getStatusStyles = (status: AppointmentStatus) => {
  switch (status) {
    case "confirmed":
      return "bg-green-500/10 text-green-700 dark:text-green-500 border-green-500/20";
    case "pending":
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 border-yellow-500/20";
    case "canceled":
      return "bg-red-500/10 text-red-700 dark:text-red-500 border-red-500/20";
    default:
      return "";
  }
};

export function AppointmentSchedule() {
  const [selected, setSelected] = useState<"today" | "tomorrow">("today");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };
  
  // Filter appointments for the selected day
  const filteredAppointments = APPOINTMENTS.filter(
    (appointment) => 
      (selected === "today" && appointment.date === TODAY) ||
      (selected === "tomorrow" && appointment.date === TOMORROW)
  );

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally add the appointment to the database
    setIsDialogOpen(false);
    
    // Show success feedback
    toast({
      title: "Agendamento criado",
      description: "O novo agendamento foi adicionado com sucesso.",
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex justify-between items-center border-b p-4">
        <h3 className="font-semibold">Agenda de Atendimentos</h3>
        <div className="flex gap-2">
          <div className="flex space-x-1">
            <Button
              variant={selected === "today" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelected("today")}
              className={cn(
                "text-xs h-8",
                selected === "today" && "animate-scale-in"
              )}
            >
              Hoje
            </Button>
            <Button
              variant={selected === "tomorrow" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelected("tomorrow")}
              className={cn(
                "text-xs h-8",
                selected === "tomorrow" && "animate-scale-in"
              )}
            >
              Amanhã
            </Button>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Agendar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-sm border border-border/50">
              <DialogHeader>
                <DialogTitle>Novo Agendamento</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes para criar um novo agendamento.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddAppointment}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="client" className="text-right">
                      Cliente
                    </Label>
                    <div className="col-span-3">
                      <Select>
                        <SelectTrigger className="bg-background/80 backdrop-blur-sm">
                          <SelectValue placeholder="Selecione um cliente" />
                        </SelectTrigger>
                        <SelectContent className="bg-background/95 backdrop-blur-sm border border-border/50">
                          <SelectItem value="henrique">Henrique Alves</SelectItem>
                          <SelectItem value="marcelo">Marcelo Santos</SelectItem>
                          <SelectItem value="bruno">Bruno Costa</SelectItem>
                          <SelectItem value="carlos">Carlos Eduardo</SelectItem>
                          <SelectItem value="rafael">Rafael Oliveira</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="service" className="text-right">
                      Serviço
                    </Label>
                    <div className="col-span-3">
                      <Select>
                        <SelectTrigger className="bg-background/80 backdrop-blur-sm">
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                        <SelectContent className="bg-background/95 backdrop-blur-sm border border-border/50">
                          <SelectItem value="corte">Corte Degradê</SelectItem>
                          <SelectItem value="barba">Barba Completa</SelectItem>
                          <SelectItem value="combo">Corte + Barba</SelectItem>
                          <SelectItem value="platinado">Platinado</SelectItem>
                          <SelectItem value="hotTowel">Hot Towel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Data
                    </Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal bg-background/80 backdrop-blur-sm",
                              !appointmentDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {appointmentDate ? (
                              format(appointmentDate, "PPP", {
                                locale: ptBR,
                              })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-background/95 backdrop-blur-sm border border-border/50">
                          <Calendar
                            mode="single"
                            selected={appointmentDate}
                            onSelect={setAppointmentDate}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Horário
                    </Label>
                    <div className="col-span-3">
                      <Select>
                        <SelectTrigger className="bg-background/80 backdrop-blur-sm">
                          <SelectValue placeholder="Selecione um horário" />
                        </SelectTrigger>
                        <SelectContent className="bg-background/95 backdrop-blur-sm border border-border/50">
                          <SelectItem value="9:00">09:00</SelectItem>
                          <SelectItem value="9:30">09:30</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="10:30">10:30</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="11:30">11:30</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="14:30">14:30</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="15:30">15:30</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                          <SelectItem value="16:30">16:30</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="professional" className="text-right">
                      Profissional
                    </Label>
                    <div className="col-span-3">
                      <Select>
                        <SelectTrigger className="bg-background/80 backdrop-blur-sm">
                          <SelectValue placeholder="Selecione um profissional" />
                        </SelectTrigger>
                        <SelectContent className="bg-background/95 backdrop-blur-sm border border-border/50">
                          <SelectItem value="andre">André Silva</SelectItem>
                          <SelectItem value="marcos">Marcos Souza</SelectItem>
                          <SelectItem value="rodrigo">Rodrigo Almeida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* New field to check if this is a free loyalty haircut */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="isLoyalty" className="text-right">
                      Corte de Fidelidade
                    </Label>
                    <div className="col-span-3">
                      <Select>
                        <SelectTrigger className="bg-background/80 backdrop-blur-sm">
                          <SelectValue placeholder="É um corte grátis?" />
                        </SelectTrigger>
                        <SelectContent className="bg-background/95 backdrop-blur-sm border border-border/50">
                          <SelectItem value="no">Não</SelectItem>
                          <SelectItem value="yes">Sim - Resgate de Fidelidade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Agendar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="p-4 bg-muted/30">
        <div className="flex items-center space-x-2 text-sm">
          <CalendarIcon className="h-4 w-4" />
          <span className="font-medium">
            {selected === "today" ? formatDate(TODAY) : formatDate(TOMORROW)}
          </span>
        </div>
      </div>
      
      <ScrollArea className="h-[240px]">
        {filteredAppointments.length > 0 ? (
          <div className="divide-y">
            {filteredAppointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={appointment.avatar}
                        alt={appointment.client}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{appointment.client}</h4>
                      <p className="text-muted-foreground text-xs">{appointment.service}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs font-normal",
                      getStatusStyles(appointment.status)
                    )}
                  >
                    {appointment.status === "confirmed" && "Confirmado"}
                    {appointment.status === "pending" && "Pendente"}
                    {appointment.status === "canceled" && "Cancelado"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-5 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>Marcelo (Barbeiro)</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs hover:bg-primary/10"
                  >
                    Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-10 px-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
              <AlertCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h4 className="font-medium mb-1">Sem agendamentos</h4>
            <p className="text-sm text-muted-foreground">
              Não há agendamentos para este dia.
            </p>
          </div>
        )}
      </ScrollArea>
      
      <div className="border-t p-3 flex justify-end">
        <Button size="sm">Ver Todos</Button>
      </div>
    </Card>
  );
}
