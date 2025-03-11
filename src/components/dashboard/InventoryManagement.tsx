
import React, { useState } from "react";
import { 
  Package, 
  AlertTriangle, 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  CircleAlert
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Tipos para os produtos no inventário
interface Product {
  id: string;
  name: string;
  quantity: number;
  minimumAlert: number;
  costPrice: number;
  expiryDate: string;
  category: string;
  description: string;
  usageFrequency: number;
}

// Dados de exemplo para produtos
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Shampoo Profissional 500ml",
    quantity: 15,
    minimumAlert: 5,
    costPrice: 25.90,
    expiryDate: "2025-06-15",
    category: "Cabelo",
    description: "Shampoo profissional para todos os tipos de cabelo",
    usageFrequency: 42
  },
  {
    id: "2",
    name: "Creme de Barbear 200g",
    quantity: 8,
    minimumAlert: 10,
    costPrice: 18.50,
    expiryDate: "2024-12-10",
    category: "Barba",
    description: "Creme hidratante para barbear com aloe vera",
    usageFrequency: 65
  },
  {
    id: "3",
    name: "Óleo para Barba 30ml",
    quantity: 4,
    minimumAlert: 5,
    costPrice: 35.75,
    expiryDate: "2026-03-22",
    category: "Barba",
    description: "Óleo premium para hidratação e styling de barba",
    usageFrequency: 28
  },
  {
    id: "4",
    name: "Pomada Modeladora 150g",
    quantity: 20,
    minimumAlert: 8,
    costPrice: 29.90,
    expiryDate: "2025-09-05",
    category: "Styling",
    description: "Pomada de fixação média para modelagem de cabelo",
    usageFrequency: 56
  },
  {
    id: "5",
    name: "Talco para Cabelo 100g",
    quantity: 3,
    minimumAlert: 4,
    costPrice: 15.20,
    expiryDate: "2024-08-17",
    category: "Finalização",
    description: "Talco para dar volume e textura aos cabelos",
    usageFrequency: 18
  }
];

// Categorias de produtos
const productCategories = ["Cabelo", "Barba", "Styling", "Finalização", "Skincare", "Acessórios"];

export const InventoryManagement = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id" | "usageFrequency">>({
    name: "",
    quantity: 0,
    minimumAlert: 0,
    costPrice: 0,
    expiryDate: "",
    category: "",
    description: ""
  });
  
  const { toast } = useToast();
  
  // Filtrar produtos com base no termo de pesquisa
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Produtos com estoque baixo (abaixo do mínimo de alerta)
  const lowStockProducts = products.filter(product => product.quantity <= product.minimumAlert);
  
  // Produtos mais usados (ordenados por frequência de uso)
  const mostUsedProducts = [...products].sort((a, b) => b.usageFrequency - a.usageFrequency).slice(0, 5);
  
  // Adicionar novo produto
  const handleAddProduct = () => {
    const id = Math.random().toString(36).substring(2, 9);
    const productToAdd = {
      ...newProduct,
      id,
      usageFrequency: 0
    };
    
    setProducts([...products, productToAdd]);
    setNewProduct({
      name: "",
      quantity: 0,
      minimumAlert: 0,
      costPrice: 0,
      expiryDate: "",
      category: "",
      description: ""
    });
    
    setIsAddDialogOpen(false);
    toast({
      title: "Produto adicionado",
      description: `${productToAdd.name} foi adicionado ao inventário.`,
    });
  };
  
  // Abrir diálogo de edição
  const handleOpenEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };
  
  // Atualizar produto
  const handleUpdateProduct = () => {
    if (!currentProduct) return;
    
    const updatedProducts = products.map(product => 
      product.id === currentProduct.id ? currentProduct : product
    );
    
    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    toast({
      title: "Produto atualizado",
      description: `${currentProduct.name} foi atualizado com sucesso.`,
    });
  };
  
  // Remover produto
  const handleDeleteProduct = (id: string) => {
    const productToDelete = products.find(product => product.id === id);
    const updatedProducts = products.filter(product => product.id !== id);
    
    setProducts(updatedProducts);
    toast({
      title: "Produto removido",
      description: `${productToDelete?.name} foi removido do inventário.`,
      variant: "destructive"
    });
  };
  
  // Atualizar campo do produto atual
  const handleCurrentProductChange = (field: keyof Product, value: any) => {
    if (!currentProduct) return;
    
    setCurrentProduct({
      ...currentProduct,
      [field]: value
    });
  };
  
  // Atualizar campo do novo produto
  const handleNewProductChange = (field: keyof Omit<Product, "id" | "usageFrequency">, value: any) => {
    setNewProduct({
      ...newProduct,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold">
              <span className="flex items-center gap-2">
                <Package className="h-6 w-6" />
                Gestão de Inventário
              </span>
            </CardTitle>
            <CardDescription>
              Gerencie o estoque de produtos da sua barbearia
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Produto
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Produto</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes do produto para adicioná-lo ao inventário.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome do Produto</Label>
                      <Input
                        id="name"
                        placeholder="Nome do produto"
                        value={newProduct.name}
                        onChange={(e) => handleNewProductChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <select
                        id="category"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={newProduct.category}
                        onChange={(e) => handleNewProductChange("category", e.target.value)}
                      >
                        <option value="">Selecione uma categoria</option>
                        {productCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantidade</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="0"
                        min="0"
                        value={newProduct.quantity.toString()}
                        onChange={(e) => handleNewProductChange("quantity", parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minimumAlert">Alerta Mínimo</Label>
                      <Input
                        id="minimumAlert"
                        type="number"
                        placeholder="0"
                        min="0"
                        value={newProduct.minimumAlert.toString()}
                        onChange={(e) => handleNewProductChange("minimumAlert", parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="costPrice">Preço de Custo (R$)</Label>
                      <Input
                        id="costPrice"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={newProduct.costPrice.toString()}
                        onChange={(e) => handleNewProductChange("costPrice", parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Data de Validade</Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={newProduct.expiryDate}
                        onChange={(e) => handleNewProductChange("expiryDate", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      placeholder="Descrição do produto"
                      value={newProduct.description}
                      onChange={(e) => handleNewProductChange("description", e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" onClick={handleAddProduct}>
                    Adicionar Produto
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Alertas de Estoque Baixo */}
          {lowStockProducts.length > 0 && (
            <div className="mb-6 p-4 border rounded-lg bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-2">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="font-medium">Alertas de Estoque Baixo</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {lowStockProducts.map(product => (
                  <div key={product.id} className="flex items-center gap-2 text-sm">
                    <CircleAlert className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                    <span>{product.name}</span>
                    <Badge variant="outline" className="ml-auto">
                      {product.quantity}/{product.minimumAlert}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tabela de Produtos */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Preço de Custo</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      Nenhum produto encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {product.quantity <= product.minimumAlert ? (
                            <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              {product.quantity}
                            </span>
                          ) : (
                            product.quantity
                          )}
                        </div>
                      </TableCell>
                      <TableCell>R$ {product.costPrice.toFixed(2)}</TableCell>
                      <TableCell>{new Date(product.expiryDate).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenEditDialog(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Relatório de Consumo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-medium">
            <span className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Relatório de Consumo
            </span>
          </CardTitle>
          <CardDescription>
            Análise dos produtos mais utilizados na barbearia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Frequência de Uso</TableHead>
                <TableHead>Estoque Atual</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mostUsedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{
                          width: `${Math.min(100, (product.usageFrequency / 100) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      {product.usageFrequency} usos
                    </span>
                  </TableCell>
                  <TableCell>{product.quantity} unidades</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog para editar produto */}
      {currentProduct && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar Produto</DialogTitle>
              <DialogDescription>
                Atualize as informações do produto no inventário.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nome do Produto</Label>
                  <Input
                    id="edit-name"
                    placeholder="Nome do produto"
                    value={currentProduct.name}
                    onChange={(e) => handleCurrentProductChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Categoria</Label>
                  <select
                    id="edit-category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={currentProduct.category}
                    onChange={(e) => handleCurrentProductChange("category", e.target.value)}
                  >
                    <option value="">Selecione uma categoria</option>
                    {productCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-quantity">Quantidade</Label>
                  <Input
                    id="edit-quantity"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={currentProduct.quantity.toString()}
                    onChange={(e) => handleCurrentProductChange("quantity", parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-minimumAlert">Alerta Mínimo</Label>
                  <Input
                    id="edit-minimumAlert"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={currentProduct.minimumAlert.toString()}
                    onChange={(e) => handleCurrentProductChange("minimumAlert", parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-costPrice">Preço de Custo (R$)</Label>
                  <Input
                    id="edit-costPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={currentProduct.costPrice.toString()}
                    onChange={(e) => handleCurrentProductChange("costPrice", parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-expiryDate">Data de Validade</Label>
                  <Input
                    id="edit-expiryDate"
                    type="date"
                    value={currentProduct.expiryDate}
                    onChange={(e) => handleCurrentProductChange("expiryDate", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Descrição do produto"
                  value={currentProduct.description}
                  onChange={(e) => handleCurrentProductChange("description", e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" onClick={handleUpdateProduct}>
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
