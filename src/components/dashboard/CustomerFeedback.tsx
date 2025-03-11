
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
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
import { 
  MessageSquare, 
  Star, 
  ThumbsUp, 
  Send, 
  PlusCircle, 
  Smartphone, 
  Mail, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  SmilePlus,
  Frown,
  Meh
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Mock feedback data
const FEEDBACK_DATA = [
  {
    id: 1,
    client: "Roberto Andrade",
    avatar: "https://ui-avatars.com/api/?name=Roberto+Andrade&background=random",
    date: "18/06/2023",
    rating: 5,
    comment: "Excelente atendimento! O corte ficou perfeito, ambiente limpo e agradável.",
    service: "Corte + Barba",
    barber: "Felipe",
    sentiment: "positive",
    responseStatus: "responded"
  },
  {
    id: 2,
    client: "Marcos Silva",
    avatar: "https://ui-avatars.com/api/?name=Marcos+Silva&background=random",
    date: "15/06/2023",
    rating: 4,
    comment: "Gostei do corte, mas achei que a espera foi um pouco longa.",
    service: "Corte Degradê",
    barber: "André",
    sentiment: "neutral",
    responseStatus: "pending"
  },
  {
    id: 3,
    client: "Lucas Mendes",
    avatar: "https://ui-avatars.com/api/?name=Lucas+Mendes&background=random",
    date: "10/06/2023",
    rating: 2,
    comment: "Não fiquei satisfeito com o corte. Pedi um estilo e saí com outro completamente diferente.",
    service: "Corte Simples",
    barber: "Carlos",
    sentiment: "negative",
    responseStatus: "responded"
  },
  {
    id: 4,
    client: "Alexandre Costa",
    avatar: "https://ui-avatars.com/api/?name=Alexandre+Costa&background=random",
    date: "05/06/2023",
    rating: 5,
    comment: "Melhor barbearia da região! Atendimento impecável e resultado excelente.",
    service: "Platinado + Barba",
    barber: "Felipe",
    sentiment: "positive",
    responseStatus: "pending"
  },
  {
    id: 5,
    client: "Pedro Almeida",
    avatar: "https://ui-avatars.com/api/?name=Pedro+Almeida&background=random",
    date: "01/06/2023",
    rating: 3,
    comment: "Serviço ok, mas poderia melhorar no acabamento do corte.",
    service: "Corte Tesoura",
    barber: "André",
    sentiment: "neutral",
    responseStatus: "responded"
  },
];

export function CustomerFeedback() {
  const [activeTab, setActiveTab] = useState("overview");
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [feedbackFormOpen, setFeedbackFormOpen] = useState(false);
  const { toast } = useToast();

  // Calculate average rating
  const averageRating = FEEDBACK_DATA.reduce((acc, item) => acc + item.rating, 0) / FEEDBACK_DATA.length;
  
  // Count ratings by sentiment
  const sentimentCounts = {
    positive: FEEDBACK_DATA.filter(item => item.sentiment === "positive").length,
    neutral: FEEDBACK_DATA.filter(item => item.sentiment === "neutral").length,
    negative: FEEDBACK_DATA.filter(item => item.sentiment === "negative").length,
  };

  // Calculate rating distribution
  const ratingDistribution = [1, 2, 3, 4, 5].map(rating => {
    const count = FEEDBACK_DATA.filter(item => item.rating === rating).length;
    const percentage = (count / FEEDBACK_DATA.length) * 100;
    return { rating, count, percentage };
  }).reverse();

  const handleSendTestRequest = () => {
    toast({
      title: "Solicitação de avaliação enviada",
      description: "Uma avaliação de teste foi enviada com sucesso.",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas preferências de avaliação foram atualizadas.",
    });
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackFormOpen(false);
    toast({
      title: "Avaliação registrada",
      description: "A avaliação foi registrada com sucesso.",
    });
  };

  const handleRespond = (id: number) => {
    toast({
      title: "Resposta enviada",
      description: "Sua resposta foi enviada ao cliente.",
    });
  };

  // Get sentiment icon
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case "neutral":
        return <Meh className="h-4 w-4 text-amber-500" />;
      case "negative":
        return <Frown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center">
          <Star className="h-5 w-5 mr-2 text-amber-500" />
          <h3 className="font-semibold">Avaliações e Feedback</h3>
        </div>
        <Dialog open={feedbackFormOpen} onOpenChange={setFeedbackFormOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-1" />
              Nova Avaliação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Registrar Avaliação</DialogTitle>
              <DialogDescription>
                Adicione manualmente uma avaliação de cliente.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitFeedback}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="client-name" className="text-right">
                    Cliente
                  </Label>
                  <Input
                    id="client-name"
                    placeholder="Nome do cliente"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="service" className="text-right">
                    Serviço
                  </Label>
                  <Select>
                    <SelectTrigger id="service" className="col-span-3">
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corte">Corte Simples</SelectItem>
                      <SelectItem value="degrade">Corte Degradê</SelectItem>
                      <SelectItem value="barba">Barba</SelectItem>
                      <SelectItem value="corte-barba">Corte + Barba</SelectItem>
                      <SelectItem value="platinado">Platinado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="barber" className="text-right">
                    Barbeiro
                  </Label>
                  <Select>
                    <SelectTrigger id="barber" className="col-span-3">
                      <SelectValue placeholder="Selecione o barbeiro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="felipe">Felipe</SelectItem>
                      <SelectItem value="andre">André</SelectItem>
                      <SelectItem value="carlos">Carlos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rating" className="text-right">
                    Nota
                  </Label>
                  <Select defaultValue="5">
                    <SelectTrigger id="rating" className="col-span-3">
                      <SelectValue placeholder="Selecione a nota" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">
                        <div className="flex items-center">
                          <span className="mr-2">5</span>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <Star key={n} className="h-3 w-3 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                      </SelectItem>
                      <SelectItem value="4">
                        <div className="flex items-center">
                          <span className="mr-2">4</span>
                          {[1, 2, 3, 4].map((n) => (
                            <Star key={n} className="h-3 w-3 fill-amber-500 text-amber-500" />
                          ))}
                          <Star className="h-3 w-3 text-amber-500" />
                        </div>
                      </SelectItem>
                      <SelectItem value="3">
                        <div className="flex items-center">
                          <span className="mr-2">3</span>
                          {[1, 2, 3].map((n) => (
                            <Star key={n} className="h-3 w-3 fill-amber-500 text-amber-500" />
                          ))}
                          {[1, 2].map((n) => (
                            <Star key={n} className="h-3 w-3 text-amber-500" />
                          ))}
                        </div>
                      </SelectItem>
                      <SelectItem value="2">
                        <div className="flex items-center">
                          <span className="mr-2">2</span>
                          {[1, 2].map((n) => (
                            <Star key={n} className="h-3 w-3 fill-amber-500 text-amber-500" />
                          ))}
                          {[1, 2, 3].map((n) => (
                            <Star key={n} className="h-3 w-3 text-amber-500" />
                          ))}
                        </div>
                      </SelectItem>
                      <SelectItem value="1">
                        <div className="flex items-center">
                          <span className="mr-2">1</span>
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          {[1, 2, 3, 4].map((n) => (
                            <Star key={n} className="h-3 w-3 text-amber-500" />
                          ))}
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="comment" className="text-right">
                    Comentário
                  </Label>
                  <Textarea
                    id="comment"
                    placeholder="Comentário do cliente"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Registrar Avaliação</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 m-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="list">Avaliações</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="p-4 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card className="p-4 flex flex-col items-center justify-center">
              <div className="flex items-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-5 w-5 ${star <= Math.round(averageRating) ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <h4 className="text-2xl font-bold">{averageRating.toFixed(1)}</h4>
              <p className="text-sm text-muted-foreground">Nota Média</p>
            </Card>
            
            <Card className="p-4 flex flex-col">
              <h4 className="text-sm font-medium mb-2">Análise de Sentimentos</h4>
              <div className="space-y-2 flex-grow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Positivo</span>
                  </div>
                  <span className="text-sm font-medium">{sentimentCounts.positive}</span>
                </div>
                <Progress value={(sentimentCounts.positive / FEEDBACK_DATA.length) * 100} className="h-2 bg-muted" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Meh className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-sm">Neutro</span>
                  </div>
                  <span className="text-sm font-medium">{sentimentCounts.neutral}</span>
                </div>
                <Progress value={(sentimentCounts.neutral / FEEDBACK_DATA.length) * 100} className="h-2 bg-muted" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Frown className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-sm">Negativo</span>
                  </div>
                  <span className="text-sm font-medium">{sentimentCounts.negative}</span>
                </div>
                <Progress value={(sentimentCounts.negative / FEEDBACK_DATA.length) * 100} className="h-2 bg-muted" />
              </div>
            </Card>
            
            <Card className="p-4 flex flex-col">
              <h4 className="text-sm font-medium mb-2">Distribuição de Notas</h4>
              <div className="space-y-2 flex-grow">
                {ratingDistribution.map((item) => (
                  <div key={item.rating} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm mr-2">{item.rating}</span>
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      </div>
                      <span className="text-xs text-muted-foreground">{item.count} ({item.percentage.toFixed(0)}%)</span>
                    </div>
                    <Progress value={item.percentage} className="h-2 bg-muted" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Últimos Comentários</h4>
            <ScrollArea className="h-[180px]">
              <div className="space-y-3">
                {FEEDBACK_DATA.slice(0, 3).map((feedback) => (
                  <Card key={feedback.id} className="p-3">
                    <div className="flex items-start space-x-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={feedback.avatar} 
                          alt={feedback.client}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-sm">{feedback.client}</h5>
                          <div className="flex items-center">
                            {getSentimentIcon(feedback.sentiment)}
                            <span className="text-xs text-muted-foreground ml-1">{feedback.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 mt-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-3 w-3 ${star <= feedback.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm mt-1">{feedback.comment}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">{feedback.service}</span>
                            <span className="text-xs text-muted-foreground">Barbeiro: {feedback.barber}</span>
                          </div>
                          {feedback.responseStatus === "pending" && (
                            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => handleRespond(feedback.id)}>
                              Responder
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
            
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setActiveTab("list")}>
                Ver Todas
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="p-4 pt-2">
          <ScrollArea className="h-[360px]">
            <div className="space-y-3">
              {FEEDBACK_DATA.map((feedback) => (
                <Card key={feedback.id} className="p-3">
                  <div className="flex items-start space-x-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={feedback.avatar} 
                        alt={feedback.client}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-sm">{feedback.client}</h5>
                        <div className="flex items-center">
                          {getSentimentIcon(feedback.sentiment)}
                          <span className="text-xs text-muted-foreground ml-1">{feedback.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 mt-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-3 w-3 ${star <= feedback.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm mt-1">{feedback.comment}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">{feedback.service}</span>
                          <span className="text-xs text-muted-foreground">Barbeiro: {feedback.barber}</span>
                        </div>
                        {feedback.responseStatus === "pending" && (
                          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => handleRespond(feedback.id)}>
                            Responder
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Mostrando {FEEDBACK_DATA.length} avaliações de um total de {FEEDBACK_DATA.length}
            </div>
            <div className="flex space-x-1">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="p-4 pt-2">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Solicitação de Avaliações</h4>
              <Card className="p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-1.5 text-green-500" />
                      <Label htmlFor="whatsapp-enabled" className="font-medium">
                        Enviar via WhatsApp
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      Solicitar avaliação automaticamente via WhatsApp após o atendimento
                    </p>
                  </div>
                  <Switch
                    id="whatsapp-enabled"
                    checked={whatsappEnabled}
                    onCheckedChange={setWhatsappEnabled}
                  />
                </div>
                
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1.5 text-blue-500" />
                      <Label htmlFor="email-enabled" className="font-medium">
                        Enviar via E-mail
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      Solicitar avaliação automaticamente via e-mail após o atendimento
                    </p>
                  </div>
                  <Switch
                    id="email-enabled"
                    checked={emailEnabled}
                    onCheckedChange={setEmailEnabled}
                  />
                </div>
                
                <div className="flex items-start justify-between pt-2 border-t">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1.5 text-purple-500" />
                      <Label htmlFor="delay-time" className="font-medium">
                        Tempo de Envio
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      Quando enviar a solicitação de avaliação após o serviço
                    </p>
                  </div>
                  <Select defaultValue="immediately">
                    <SelectTrigger id="delay-time" className="w-[180px]">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Imediatamente</SelectItem>
                      <SelectItem value="1hour">Após 1 hora</SelectItem>
                      <SelectItem value="3hours">Após 3 horas</SelectItem>
                      <SelectItem value="nextday">No dia seguinte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end pt-2">
                  <Button size="sm" onClick={handleSendTestRequest}>
                    Enviar Teste
                  </Button>
                </div>
              </Card>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Modelo de Mensagem</h4>
              <Card className="p-4">
                <Textarea 
                  defaultValue="Olá, obrigado por visitar a nossa barbearia! Gostaríamos de saber como foi sua experiência. Por favor, avalie nosso serviço clicando no link abaixo:" 
                  className="mb-4"
                />
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    Restaurar Padrão
                  </Button>
                </div>
              </Card>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Análise de Sentimentos</h4>
              <Card className="p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <SmilePlus className="h-4 w-4 mr-1.5 text-indigo-500" />
                      <Label htmlFor="ai-analysis" className="font-medium">
                        Análise automática
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      Classificar automaticamente os comentários usando IA
                    </p>
                  </div>
                  <Switch
                    id="ai-analysis"
                    defaultChecked={true}
                  />
                </div>
                
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1.5 text-red-500" />
                      <Label htmlFor="auto-reply" className="font-medium">
                        Resposta automática
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      Responder automaticamente a avaliações positivas
                    </p>
                  </div>
                  <Switch
                    id="auto-reply"
                    defaultChecked={false}
                  />
                </div>
              </Card>
            </div>
            
            <Button onClick={handleSaveSettings} className="w-full">
              Salvar Configurações
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
