
import React, { useState } from "react";
import { 
  Scissors, 
  MoreVertical, 
  Clock, 
  CircleDollarSign,
  Pencil, 
  Trash2,
  Plus
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock services data
const SERVICES = [
  {
    id: 1,
    name: "Corte Degradê",
    description: "Corte moderno com máquina e tesoura",
    duration: 30,
    price: 45,
    popular: true,
    image: "https://placehold.co/100x100/222/white?text=Degradê",
  },
  {
    id: 2,
    name: "Barba Completa",
    description: "Modelagem e hidratação da barba",
    duration: 25,
    price: 35,
    popular: false,
    image: "https://placehold.co/100x100/222/white?text=Barba",
  },
  {
    id: 3,
    name: "Corte + Barba",
    description: "Combo completo para renovação do visual",
    duration: 60,
    price: 70,
    popular: true,
    image: "https://placehold.co/100x100/222/white?text=Combo",
  },
  {
    id: 4,
    name: "Platinado",
    description: "Descoloração e tratamento",
    duration: 120,
    price: 150,
    popular: false,
    image: "https://placehold.co/100x100/222/white?text=Platinado",
  },
  {
    id: 5,
    name: "Hot Towel",
    description: "Toalha quente e hidratação facial",
    duration: 20,
    price: 30,
    popular: false,
    image: "https://placehold.co/100x100/222/white?text=HotTowel",
  },
];

export function ServicesList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally add the service to the database
    // For this demo, we'll just close the dialog
    setIsDialogOpen(false);
    // Show success feedback in a real app
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex justify-between items-center border-b p-4">
        <h3 className="font-semibold">Serviços Oferecidos</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Novo Serviço</DialogTitle>
              <DialogDescription>
                Adicione um novo serviço ao seu catálogo.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddService}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ex: Corte Degradê"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descrição
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Breve descrição do serviço"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duração (min)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="Ex: 30"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Preço (R$)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Ex: 45.00"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Imagem URL
                  </Label>
                  <Input
                    id="image"
                    placeholder="https://..."
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="popular" className="text-right">
                    Popular
                  </Label>
                  <div className="flex items-center gap-2 col-span-3">
                    <Switch id="popular" />
                    <Label htmlFor="popular" className="text-sm text-muted-foreground">
                      Marcar como serviço popular
                    </Label>
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
      
      <ScrollArea className="h-[340px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="glass-card rounded-lg overflow-hidden flex"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{service.name}</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Opções</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Pencil className="h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 flex items-center gap-2">
                          <Trash2 className="h-4 w-4" />
                          <span>Remover</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                    {service.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{service.duration} min</span>
                    </div>
                    <div className="flex items-center font-medium">
                      <CircleDollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>R$ {service.price}</span>
                    </div>
                  </div>
                  
                  {service.popular && (
                    <Badge 
                      variant="outline" 
                      className="text-[10px] h-5 bg-primary/5 text-primary border-primary/20"
                    >
                      Popular
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="border-t p-3 flex justify-between items-center">
        <div className="flex items-center">
          <Scissors className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{SERVICES.length} serviços</span>
        </div>
        <Button size="sm" variant="outline">Ver Todos</Button>
      </div>
    </Card>
  );
}
