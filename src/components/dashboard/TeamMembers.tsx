
import React from "react";
import { 
  Users, 
  Star, 
  Scissors, 
  Phone,
  Calendar
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Mock team members data
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "André Silva",
    role: "Barbeiro Master",
    specialty: ["Degradê", "Barba"],
    experience: 5,
    rating: 4.9,
    availability: 85,
    clients: 143,
    image: "https://ui-avatars.com/api/?name=André+Silva&background=random&size=200",
  },
  {
    id: 2,
    name: "Marcos Souza",
    role: "Barbeiro",
    specialty: ["Corte Tesoura", "Tratamentos"],
    experience: 3,
    rating: 4.7,
    availability: 70,
    clients: 92,
    image: "https://ui-avatars.com/api/?name=Marcos+Souza&background=random&size=200",
  },
  {
    id: 3,
    name: "Rodrigo Almeida",
    role: "Barbeiro Senior",
    specialty: ["Platinado", "Design de Barba"],
    experience: 7,
    rating: 4.8,
    availability: 60,
    clients: 215,
    image: "https://ui-avatars.com/api/?name=Rodrigo+Almeida&background=random&size=200",
  },
];

export function TeamMembers() {
  return (
    <Card className="overflow-hidden">
      <div className="flex justify-between items-center border-b p-4">
        <h3 className="font-semibold">Equipe</h3>
        <Button size="sm">Gerenciar</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
        {TEAM_MEMBERS.map((member) => (
          <div key={member.id} className="p-4 flex flex-col">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="text-xs">{member.rating} • {member.experience} anos</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 flex-1">
              <div>
                <div className="text-xs text-muted-foreground mb-1 flex items-center">
                  <Scissors className="h-3 w-3 mr-1" />
                  <span>Especialidades</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {member.specialty.map((spec) => (
                    <span 
                      key={spec} 
                      className="px-2 py-0.5 bg-muted text-xs rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-xs text-muted-foreground mb-1 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Disponibilidade</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs">{member.availability}%</span>
                  <span className="text-xs text-muted-foreground">Esta semana</span>
                </div>
                <Progress value={member.availability} className="h-1.5" />
              </div>
              
              <div>
                <div className="text-xs text-muted-foreground mb-1 flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  <span>Clientes atendidos</span>
                </div>
                <p className="text-sm font-medium">{member.clients}</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3 w-full"
            >
              <Phone className="h-3 w-3 mr-2" />
              Contatar
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
