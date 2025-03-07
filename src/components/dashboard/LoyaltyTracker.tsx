
import React, { useState } from "react";
import { Gift, Award, User, Search, BarChart4 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock loyalty data
const LOYALTY_DATA = [
  {
    id: 1,
    client: "Henrique Alves",
    visitsCount: 3,
    rewardProgress: 60,
    avatar: "https://ui-avatars.com/api/?name=Henrique+Alves&background=random",
    lastVisit: "10/05/2023",
  },
  {
    id: 2,
    client: "Marcelo Santos",
    visitsCount: 4,
    rewardProgress: 80,
    avatar: "https://ui-avatars.com/api/?name=Marcelo+Santos&background=random",
    lastVisit: "02/06/2023",
  },
  {
    id: 3,
    client: "Bruno Costa",
    visitsCount: 5, // Eligible for free haircut
    rewardProgress: 100,
    avatar: "https://ui-avatars.com/api/?name=Bruno+Costa&background=random",
    lastVisit: "28/05/2023",
    freeHaircutAvailable: true,
  },
  {
    id: 4,
    client: "Carlos Eduardo",
    visitsCount: 2,
    rewardProgress: 40,
    avatar: "https://ui-avatars.com/api/?name=Carlos+Eduardo&background=random",
    lastVisit: "15/06/2023",
  },
  {
    id: 5,
    client: "Rafael Oliveira",
    visitsCount: 1,
    rewardProgress: 20,
    avatar: "https://ui-avatars.com/api/?name=Rafael+Oliveira&background=random",
    lastVisit: "05/06/2023",
  },
];

export function LoyaltyTracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const filteredClients = LOYALTY_DATA.filter((client) =>
    client.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRedeemReward = (clientId: number, clientName: string) => {
    // In a real app, this would update the database
    toast({
      title: "Cupom aplicado!",
      description: `${clientName} recebeu um corte grátis como recompensa de fidelidade.`,
      variant: "default",
    });
  };

  const handleAddVisit = (clientId: number, clientName: string) => {
    // In a real app, this would update the database
    toast({
      title: "Visita registrada!",
      description: `Visita adicionada para ${clientName}.`,
      variant: "default",
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex justify-between items-center border-b p-4">
        <div className="flex items-center">
          <Gift className="h-5 w-5 mr-2 text-primary" />
          <h3 className="font-semibold">Programa de Fidelidade</h3>
        </div>
        <Button size="sm" variant="outline">
          <BarChart4 className="h-4 w-4 mr-1" />
          Estatísticas
        </Button>
      </div>
      
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center space-x-2 mb-3">
          <Award className="h-4 w-4 text-amber-500" />
          <span className="font-medium text-sm">A cada 5 cortes, o próximo é grátis!</span>
        </div>
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
      
      <ScrollArea className="h-[300px]">
        {filteredClients.length > 0 ? (
          <div className="divide-y">
            {filteredClients.map((client) => (
              <div 
                key={client.id} 
                className="p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={client.avatar} 
                        alt={client.client}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium text-sm">{client.client}</h4>
                        {client.freeHaircutAvailable && (
                          <Badge className="ml-2 bg-amber-500 hover:bg-amber-600">Corte Grátis</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">Última visita: {client.lastVisit}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAddVisit(client.id, client.client)}
                    >
                      <User className="h-3 w-3 mr-1" />
                      +Visita
                    </Button>
                    {client.rewardProgress === 100 && (
                      <Button 
                        size="sm" 
                        onClick={() => handleRedeemReward(client.id, client.client)}
                      >
                        <Gift className="h-3 w-3 mr-1" />
                        Resgatar
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>{client.visitsCount} de 5 cortes</span>
                    <span>{client.rewardProgress}%</span>
                  </div>
                  <Progress value={client.rewardProgress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <h4 className="text-sm font-medium mb-1">Nenhum cliente encontrado</h4>
            <p className="text-xs text-muted-foreground">
              Tente uma busca diferente ou adicione novos clientes.
            </p>
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}
