
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Receipt, 
  CreditCard, 
  DollarSign, 
  QrCode, 
  Download, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Plus,
  ArrowRight,
  Check
} from "lucide-react";

// Mock data for transactions
const TRANSACTIONS = [
  {
    id: "T001",
    date: "2023-07-15",
    client: "João Silva",
    service: "Corte + Barba",
    amount: 70.00,
    method: "Cartão de Crédito",
    status: "Completo"
  },
  {
    id: "T002",
    date: "2023-07-15",
    client: "Carlos Oliveira",
    service: "Degradê",
    amount: 45.00,
    method: "PIX",
    status: "Completo"
  },
  {
    id: "T003",
    date: "2023-07-14",
    client: "André Pereira",
    service: "Barba",
    amount: 30.00,
    method: "Dinheiro",
    status: "Completo"
  },
  {
    id: "T004",
    date: "2023-07-14",
    client: "Rafael Costa",
    service: "Corte Premium",
    amount: 65.00,
    method: "Cartão de Débito",
    status: "Completo"
  },
  {
    id: "T005",
    date: "2023-07-13",
    client: "Ricardo Mendes",
    service: "Corte + Hidratação",
    amount: 85.00,
    method: "PIX",
    status: "Completo"
  },
  {
    id: "T006",
    date: "2023-07-12",
    client: "Fernando Cardoso",
    service: "Corte Infantil",
    amount: 35.00,
    method: "Dinheiro",
    status: "Completo"
  },
  {
    id: "T007",
    date: "2023-07-12",
    client: "Gustavo Santos",
    service: "Platinado",
    amount: 120.00,
    method: "Cartão de Crédito",
    status: "Completo"
  }
];

// Payment method icons
const PaymentMethodIcon = ({ method }: { method: string }) => {
  switch (method) {
    case "Cartão de Crédito":
    case "Cartão de Débito":
      return <CreditCard className="h-4 w-4" />;
    case "Dinheiro":
      return <DollarSign className="h-4 w-4" />;
    case "PIX":
      return <QrCode className="h-4 w-4" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let variant: "default" | "outline" | "secondary" | "destructive" = "default";
  
  switch (status) {
    case "Completo":
      variant = "default";
      break;
    case "Pendente":
      variant = "secondary";
      break;
    case "Cancelado":
      variant = "destructive";
      break;
    default:
      variant = "outline";
  }
  
  return <Badge variant={variant}>{status}</Badge>;
};

export function PaymentManagement() {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("transactions");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMethod, setFilterMethod] = useState("all");
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<typeof TRANSACTIONS[0] | null>(null);
  
  // Filter transactions by search query and payment method
  const filteredTransactions = TRANSACTIONS.filter(transaction => {
    const matchesSearch = 
      transaction.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesMethod = 
      filterMethod === "all" || 
      transaction.method.toLowerCase().includes(filterMethod.toLowerCase());
      
    return matchesSearch && matchesMethod;
  });
  
  // Handler to show receipt
  const handleShowReceipt = (transaction: typeof TRANSACTIONS[0]) => {
    setSelectedTransaction(transaction);
    setReceiptDialogOpen(true);
  };
  
  // Handler to generate and download receipt
  const handleDownloadReceipt = () => {
    if (!selectedTransaction) return;
    
    toast({
      title: "Recibo baixado",
      description: `O recibo #${selectedTransaction.id} foi baixado com sucesso.`,
    });
    
    setReceiptDialogOpen(false);
  };
  
  // Handler for payment gateway integration
  const handleIntegrateGateway = (gateway: string) => {
    toast({
      title: "Integração iniciada",
      description: `A integração com ${gateway} foi iniciada. Você será redirecionado para configurar sua conta.`,
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestão de Pagamentos</CardTitle>
            <CardDescription>
              Visualize transações, emita recibos e configure gateways de pagamento
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="receipts">Recibos</TabsTrigger>
            <TabsTrigger value="gateways">Gateways de Pagamento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar transações..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={filterMethod}
                  onValueChange={setFilterMethod}
                >
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os métodos</SelectItem>
                    <SelectItem value="cartão">Cartão</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Transação
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Valor
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{new Date(transaction.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{transaction.client}</TableCell>
                      <TableCell>{transaction.service}</TableCell>
                      <TableCell>R$ {transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <PaymentMethodIcon method={transaction.method} />
                          <span>{transaction.method}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={transaction.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleShowReceipt(transaction)}
                        >
                          <Receipt className="h-4 w-4 mr-2" />
                          Recibo
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="receipts" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Modelos de Recibo</CardTitle>
                  <CardDescription>Personalize os recibos da sua barbearia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Logo da Empresa</Label>
                      <div className="flex items-center gap-2">
                        <div className="h-16 w-32 bg-muted rounded flex items-center justify-center">
                          <p className="text-xs text-muted-foreground">Logo atual</p>
                        </div>
                        <Button variant="outline" size="sm">Alterar</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Informações Adicionais</Label>
                      <Input placeholder="CNPJ da empresa" />
                      <Input placeholder="Endereço da empresa" />
                      <Input placeholder="Telefone de contato" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Salvar Configurações</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recibos Recentes</CardTitle>
                  <CardDescription>Últimos 5 recibos emitidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {TRANSACTIONS.slice(0, 5).map((transaction) => (
                      <div 
                        key={transaction.id}
                        className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                        onClick={() => handleShowReceipt(transaction)}
                      >
                        <div className="flex items-center gap-2">
                          <Receipt className="h-4 w-4" />
                          <div>
                            <p className="text-sm font-medium">{transaction.client}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(transaction.date).toLocaleDateString('pt-BR')} • R$ {transaction.amount.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Ver Todos os Recibos</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="gateways" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-[#012169] text-white">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    Mercado Pago
                  </CardTitle>
                  <CardDescription>Aceite cartões, boletos e PIX</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Popular no Brasil</Badge>
                    <Badge variant="outline">Taxas a partir de 2.99%</Badge>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      Integração com PIX
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      Checkout transparente
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      Recebimento em 1 dia útil
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleIntegrateGateway("Mercado Pago")}
                  >
                    Integrar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-[#6772E5] text-white">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    Stripe
                  </CardTitle>
                  <CardDescription>Solução global de pagamentos</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Internacional</Badge>
                    <Badge variant="outline">Taxas a partir de 3.5%</Badge>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      Aceita mais de 135 moedas
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      Integração simples via API
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      Recorrência e assinaturas
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleIntegrateGateway("Stripe")}
                  >
                    Integrar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-[#003087] text-white">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    PayPal
                  </CardTitle>
                  <CardDescription>Aceite pagamentos internacionais</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Reconhecido globalmente</Badge>
                    <Badge variant="outline">Taxas a partir de 4.0%</Badge>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      Proteção ao vendedor
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      Conversão de moedas
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      Checkout expresso
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleIntegrateGateway("PayPal")}
                  >
                    Integrar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Receipt Dialog */}
      <Dialog open={receiptDialogOpen} onOpenChange={setReceiptDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Recibo de Pagamento</DialogTitle>
            <DialogDescription>
              Detalhes da transação {selectedTransaction?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="space-y-6">
              <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between">
                  <div className="font-medium">Barbearia StyleCuts</div>
                  <div>Recibo #{selectedTransaction.id}</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Av. Paulista, 1000 • São Paulo, SP • 01310-100 • (11) 3456-7890
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Cliente</div>
                    <div className="font-medium">{selectedTransaction.client}</div>
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="text-sm text-muted-foreground">Data</div>
                    <div>{new Date(selectedTransaction.date).toLocaleDateString('pt-BR')}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Serviço</div>
                  <div className="font-medium">{selectedTransaction.service}</div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <div className="font-medium">Total</div>
                    <div className="font-bold">R$ {selectedTransaction.amount.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-sm text-muted-foreground">Método de Pagamento</div>
                    <div className="flex items-center gap-1">
                      <PaymentMethodIcon method={selectedTransaction.method} />
                      <span>{selectedTransaction.method}</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-sm text-muted-foreground">Status</div>
                    <StatusBadge status={selectedTransaction.status} />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-between">
            <DialogTrigger asChild>
              <Button variant="outline">Fechar</Button>
            </DialogTrigger>
            <Button onClick={handleDownloadReceipt}>
              <Download className="h-4 w-4 mr-2" />
              Baixar Recibo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
