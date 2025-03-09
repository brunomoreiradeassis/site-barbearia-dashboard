import React, { useState } from "react";
import { 
  Users, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  CalendarCheck,
  Banknote,
  Clock,
  Plus,
  User,
  Scissors
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

// Mock clients data
const CLIENTS = [
  {
    id: 1,
    name: "Henrique Alves",
    email: "henrique@exemplo.com",
    phone: "(11) 98765-4321",
    visits: 8,
    lastVisit: "10/05/2023",
    totalSpent: 380,
    preferences: ["Degradê", "Barba"],
    avatar: "https://ui-avatars.com/api/?name=Henrique+Alves&background=random",
  },
  {
    id: 2,
    name: "Marcelo Santos",
    email: "marcelo@exemplo.com",
    phone: "(11) 91234-5678",
    visits: 5,
    lastVisit: "02/06/2023",
    totalSpent: 225,
    preferences: ["Corte Tesoura"],
    avatar: "https://ui-avatars.com/api/?name=Marcelo+Santos&background=random",
  },
  {
    id: 3,
    name: "Bruno Costa",
    email: "bruno@exemplo.com",
    phone: "(11) 99876-5432",
    visits: 12,
    lastVisit: "28/05/2023",
    totalSpent: 650,
    preferences: ["Platinado", "Barba"],
    avatar: "https://ui-avatars.com/api/?name=Bruno+Costa&background=random",
  },
  {
    id: 4,
    name: "Carlos Eduardo",
    email: "carlos@exemplo.com",
    phone: "(11) 98888-7777",
    visits: 3,
    lastVisit: "15/06/2023",
    totalSpent: 140,
    preferences: ["Degradê"],
    avatar: "https://ui-avatars.com/api/?name=Carlos+Eduardo&background=random",
  },
  {
    id: 5,
    name: "Rafael Oliveira",
    email: "rafael@exemplo.com",
    phone: "(11) 97777-8888",
    visits: 7,
    lastVisit: "05/06/2023",
    totalSpent: 420,
    preferences: ["Corte + Barba"],
    avatar: "https://ui-avatars.com/api/?name=Rafael+Oliveira&background=random",
  },
];

export function ClientsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const filteredClients = CLIENTS.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    
    toast({
      title: "Cliente adicionado",
      description: "O novo cliente foi cadastrado com sucesso.",
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex justify-between items-center border-b p-4">
        <h3 className="font-semibold">Clientes</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-sm border border-border/50">
            <DialogHeader>
              <DialogTitle>Novo Cliente</DialogTitle>
              <DialogDescription>
                Adicione um novo cliente à sua base.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddClient}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    placeholder="Nome completo"
                    className="col-span-3 bg-background/80 backdrop-blur-sm"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    className="col-span-3 bg-background/80 backdrop-blur-sm"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="(00) 00000-0000"
                    className="col-span-3 bg-background/80 backdrop-blur-sm"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="preferences" className="text-right">
                    Preferências
                  </Label>
                  <Input
                    id="preferences"
                    placeholder="Ex: Degradê, Barba (separados por vírgula)"
                    className="col-span-3 bg-background/80 backdrop-blur-sm"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Observações
                  </Label>
                  <Input
                    id="notes"
                    placeholder="Observações especiais"
                    className="col-span-3 bg-background/80 backdrop-blur-sm"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right flex items-center">
                    <Scissors className="h-3 w-3 mr-1" />
                    Fidelidade
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>0 de 5 cortes</span>
                      <span>0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar cliente..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="h-[240px]">
        {filteredClients.length > 0 ? (
          <div className="divide-y">
            {filteredClients.map((client) => (
              <div 
                key={client.id} 
                className="p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={client.avatar}
                        alt={client.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{client.name}</h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{client.email}</span>
                        <span>•</span>
                        <span>{client.phone}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8">
                    Perfil
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <CalendarCheck className="h-3 w-3 mr-1" />
                      <span className="text-[10px]">Visitas</span>
                    </div>
                    <span className="text-sm font-semibold">{client.visits}</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <Banknote className="h-3 w-3 mr-1" />
                      <span className="text-[10px]">Total Gasto</span>
                    </div>
                    <span className="text-sm font-semibold">R$ {client.totalSpent}</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="text-[10px]">Última Visita</span>
                    </div>
                    <span className="text-sm font-semibold">{client.lastVisit}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-1">Preferências:</p>
                  <div className="flex flex-wrap gap-1">
                    {client.preferences.map((pref) => (
                      <span 
                        key={pref} 
                        className="px-2 py-0.5 bg-muted text-xs rounded-full"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-10 px-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <h4 className="font-medium mb-1">Nenhum cliente encontrado</h4>
            <p className="text-sm text-muted-foreground">
              Tente ajustar sua busca ou adicione um novo cliente.
            </p>
          </div>
        )}
      </ScrollArea>
      
      <div className="border-t p-3 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Mostrando {filteredClients.length} de {CLIENTS.length} clientes
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Anterior</span>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próximo</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
