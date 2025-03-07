
import React, { useState } from "react";
import { 
  Users, 
  Star, 
  Scissors, 
  Phone,
  Calendar,
  Plus,
  User
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally add the team member to the database
    // For this demo, we'll just close the dialog
    setIsDialogOpen(false);
    // Show success feedback in a real app
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex justify-between items-center border-b p-4">
        <h3 className="font-semibold">Equipe</h3>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Novo Membro da Equipe</DialogTitle>
                <DialogDescription>
                  Adicione um novo profissional à sua equipe.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddTeamMember}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      placeholder="Nome completo"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Cargo
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione um cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="barbeiro">Barbeiro</SelectItem>
                        <SelectItem value="barbeiro-senior">Barbeiro Senior</SelectItem>
                        <SelectItem value="barbeiro-master">Barbeiro Master</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="experience" className="text-right">
                      Experiência
                    </Label>
                    <div className="col-span-3 flex items-center">
                      <Input
                        id="experience"
                        type="number"
                        placeholder="Anos de experiência"
                        className="w-full"
                      />
                      <span className="ml-2">anos</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="specialty" className="text-right">
                      Especialidades
                    </Label>
                    <Input
                      id="specialty"
                      placeholder="Ex: Degradê, Barba (separados por vírgula)"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="photo" className="text-right">
                      Foto URL
                    </Label>
                    <Input
                      id="photo"
                      placeholder="https://..."
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="availability" className="text-right">
                      Disponibilidade
                    </Label>
                    <div className="col-span-3 flex items-center">
                      <Input
                        id="availability"
                        type="number"
                        placeholder="% de disponibilidade"
                        className="w-full"
                      />
                      <span className="ml-2">%</span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button size="sm">Gerenciar</Button>
        </div>
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
