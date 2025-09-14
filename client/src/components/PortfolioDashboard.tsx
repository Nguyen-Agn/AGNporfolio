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

interface Portfolio {
  id: string;
  title: string;
  description: string;
  lastModified: string;
  template: string;
  isPublished: boolean;
}

// todo: remove mock functionality
const mockPortfolios: Portfolio[] = [
  {
    id: "1",
    title: "Creative Designer Portfolio",
    description: "Showcasing my UI/UX and graphic design work",
    lastModified: "2 hours ago",
    template: "Creative",
    isPublished: true
  },
  {
    id: "2", 
    title: "Photography Collection",
    description: "Professional photography and visual storytelling",
    lastModified: "1 day ago",
    template: "Photography",
    isPublished: false
  },
  {
    id: "3",
    title: "Developer Portfolio",
    description: "Full-stack development projects and achievements",
    lastModified: "3 days ago", 
    template: "Professional",
    isPublished: true
  }
];

export default function PortfolioDashboard() {
  const [portfolios] = useState<Portfolio[]>(mockPortfolios);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPortfolios = portfolios.filter(portfolio =>
    portfolio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    portfolio.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNew = () => {
    console.log("Create new portfolio triggered");
  };

  const handleEdit = (id: string) => {
    console.log(`Edit portfolio ${id} triggered`);
  };

  const handleDuplicate = (id: string) => {
    console.log(`Duplicate portfolio ${id} triggered`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete portfolio ${id} triggered`);
  };

  const handleView = (id: string) => {
    console.log(`View portfolio ${id} triggered`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">My Portfolios</h1>
          <p className="text-muted-foreground">Create and manage your professional portfolios</p>
        </div>
        
        <Button onClick={handleCreateNew} data-testid="button-create-portfolio">
          <Plus className="h-4 w-4 mr-2" />
          Create Portfolio
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search portfolios..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          data-testid="input-search-portfolios"
        />
      </div>

      {/* Portfolios Grid */}
      {filteredPortfolios.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-heading font-semibold mb-2">No Portfolios Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try a different search term" : "Create your first portfolio to get started"}
            </p>
            {!searchQuery && (
              <Button onClick={handleCreateNew} data-testid="button-create-first-portfolio">
                <Plus className="h-4 w-4 mr-2" />
                Create Portfolio
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios.map((portfolio) => (
            <Card key={portfolio.id} className="hover-elevate cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="font-heading text-lg truncate">{portfolio.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{portfolio.template} Template</p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" data-testid={`button-portfolio-menu-${portfolio.id}`}>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(portfolio.id)} data-testid={`menu-view-${portfolio.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(portfolio.id)} data-testid={`menu-edit-${portfolio.id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(portfolio.id)} data-testid={`menu-duplicate-${portfolio.id}`}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(portfolio.id)} 
                        className="text-destructive"
                        data-testid={`menu-delete-${portfolio.id}`}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
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
                  <span>Modified {portfolio.lastModified}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      portfolio.isPublished ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <span>{portfolio.isPublished ? 'Published' : 'Draft'}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleView(portfolio.id)}
                    data-testid={`button-view-${portfolio.id}`}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEdit(portfolio.id)}
                    data-testid={`button-edit-${portfolio.id}`}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
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