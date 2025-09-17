import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, MoreVertical, Edit, Copy, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Portfolio } from "@shared/schema";
import { useLocation } from "wouter";

export default function PortfolioDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  // Fetch portfolios from API
  const { data: portfolios = [], isLoading } = useQuery<Portfolio[]>({
    queryKey: ["/api/portfolios/a"],
  });

  // Delete portfolio mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE",`/api/portfolios/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolios/a"] });
      toast({
        title: "Thành công",
        description: "Portfolio đã được xóa thành công",
      });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể xóa portfolio. Vui lòng thử lại.",
        variant: "destructive",
      });
    },
  });



  const filteredPortfolios = portfolios.filter(portfolio =>
    portfolio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (portfolio.description && portfolio.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString: string | Date) => {
    if (!dateString) return "chưa xác định";
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "vừa xong";
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} ngày trước`;
    
    return date.toLocaleDateString("vi-VN");
  };

const handleCreateNew = () => setLocation("/editor");
const handleEdit = (id: string) => setLocation(`/editor/${id}`);


  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa portfolio này?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleView = (id: string) => {
    setLocation(`/portfolio/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">Portfolio Của Tôi</h1>
          <p className="text-muted-foreground">Tạo và quản lý portfolio chuyên nghiệp của bạn</p>
        </div>
        
        <Button onClick={handleCreateNew} data-testid="button-create-portfolio">
          <Plus className="h-4 w-4 mr-2" />
          Tạo Portfolio
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm portfolio..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          data-testid="input-search-portfolios"
        />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredPortfolios.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-heading font-semibold mb-2">Không Tìm Thấy Portfolio</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Thử từ khóa tìm kiếm khác" : "Tạo portfolio đầu tiên của bạn để bắt đầu"}
            </p>
            {!searchQuery && (
              <Button onClick={handleCreateNew} data-testid="button-create-first-portfolio">
                <Plus className="h-4 w-4 mr-2" />
                Tạo Portfolio
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios.map((portfolio,idx) => (
            <Card key={idx} className="hover-elevate cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="font-heading text-lg truncate">{portfolio.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{portfolio.template || 'Mặc định'} Template</p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" data-testid={`button-portfolio-menu-${portfolio._id}`}>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(portfolio._id)} data-testid={`menu-view-${portfolio._id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Xem
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(portfolio._id)} data-testid={`menu-edit-${portfolio._id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Chỉnh Sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(portfolio._id)} 
                        className="text-destructive"
                        data-testid={`menu-delete-${portfolio._id}`}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {portfolio.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Sửa đổi {formatDate(portfolio.updatedAt || portfolio.createdAt || "")}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      portfolio.isPublished? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <span>{portfolio.isPublished? 'Đã xuất bản' : 'Bản nháp'}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleView(portfolio._id)}
                    data-testid={`button-view-${portfolio._id}`}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Xem
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEdit(portfolio._id)}
                    data-testid={`button-edit-${portfolio._id}`}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Sửa
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}