import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Type, 
  Image, 
  Square, 
  Save, 
  Eye, 
  ArrowLeft,
  Plus,
  Settings,
  Trash2,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Portfolio, InsertPortfolio } from "@shared/schema";
import { getTemplateById, getAllTemplates, type ContentBlock, type TemplateConfig } from "@/lib/templates";
import A4Canvas from "./A4Canvas";

// ContentBlock interface is now imported from templates

interface PortfolioEditorProps {
  portfolioId?: string;
}

export default function PortfolioEditor({ portfolioId }: PortfolioEditorProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [isCreating, setIsCreating] = useState(!portfolioId);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<TemplateConfig | null>(null);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    template: "default"
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Load existing portfolio if editing
  const { data: portfolio, isLoading } = useQuery<Portfolio>({
    queryKey: ["/api/portfolios", portfolioId],
    enabled: !!portfolioId,
  });
  
  // Load template content when template changes
  useEffect(() => {
    if (formData.template) {
      const template = getTemplateById(formData.template);
      setCurrentTemplate(template);
      if (isCreating) {
        setContentBlocks(template.defaultBlocks);
      }
    }
  }, [formData.template, isCreating]);
  
  // Load portfolio content when portfolio is loaded
  useEffect(() => {
    if (portfolio && !isCreating) {
      setCurrentTemplate(getTemplateById(portfolio.template || 'default'));
      
      // Parse content from portfolio or use template defaults
      try {
        const portfolioContent = portfolio.content as any;
        if (portfolioContent && portfolioContent.blocks && portfolioContent.blocks.length > 0) {
          setContentBlocks(portfolioContent.blocks);
        } else {
          // Use template defaults if no content exists
          const template = getTemplateById(portfolio.template || 'default');
          setContentBlocks(template.defaultBlocks);
        }
      } catch (error) {
        console.error('Error parsing portfolio content:', error);
        const template = getTemplateById(portfolio.template || 'default');
        setContentBlocks(template.defaultBlocks);
      }
    }
  }, [portfolio, isCreating]);

  // Create portfolio mutation
  const createMutation = useMutation({
    mutationFn: async (data: InsertPortfolio) => {
      const response = await apiRequest("POST", "/api/portfolios", data);
      const portfolio = await response.json();
      return portfolio as Portfolio;
    },
    onSuccess: (newPortfolio: any) => {
      setIsCreating(false);
      toast({
        title: "Thành công",
        description: "Portfolio đã được tạo thành công",
      });
      // Update URL to edit mode
      window.history.pushState(null, "", `/editor/${newPortfolio.id}`);
      queryClient.invalidateQueries({ queryKey: ["/api/portfolios"] });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể tạo portfolio. Vui lòng thử lại.",
        variant: "destructive",
      });
    },
  });

  // Update portfolio mutation  
  const updateMutation = useMutation({
    mutationFn: async (data: Partial<InsertPortfolio>) => {
      if (!portfolioId) throw new Error("No portfolio ID provided");
      const response = await apiRequest("PUT", `/api/portfolios/${portfolioId}`, data);
      const portfolio = await response.json();
      return portfolio as Portfolio;
    },
    onSuccess: () => {
      toast({
        title: "Đã lưu",
        description: "Thay đổi đã được lưu thành công",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolios", portfolioId] });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolios"] });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể lưu thay đổi. Vui lòng thử lại.",
        variant: "destructive",
      });
    },
  });
  
  // Content blocks are now managed by template system

  const tools = [
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'image', icon: Image, label: 'Image' },
    { id: 'section', icon: Square, label: 'Section' }
  ];

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(selectedTool === toolId ? null : toolId);
    console.log(`Tool ${toolId} selected`);
  };

  // Function to add new content block
  const addContentBlock = (type: 'text' | 'section' | 'image', defaultContent: string = '', defaultStyle: Record<string, any> = {}) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      content: defaultContent,
      style: defaultStyle
    };
    
    setContentBlocks(prev => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  // Function to update block style
  const updateBlockStyle = (blockId: string, newStyle: Record<string, any>) => {
    setContentBlocks(prev => 
      prev.map(block => 
        block.id === blockId ? { ...block, style: { ...block.style, ...newStyle } } : block
      )
    );
  };

  // Function to delete content block
  const deleteContentBlock = (blockId: string) => {
    setContentBlocks(prev => prev.filter(block => block.id !== blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
    if (editingBlockId === blockId) {
      setEditingBlockId(null);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tiêu đề portfolio",
        variant: "destructive",
      });
      return;
    }
    
    const portfolioData: InsertPortfolio = {
      title: formData.title,
      description: formData.description || undefined,
      template: formData.template,
      content: {
        blocks: contentBlocks,
        template: formData.template
      },
      isPublished: "false"
    };
    
    createMutation.mutate(portfolioData);
  };

  const handleSave = () => {
    if (!portfolio || isCreating) {
      console.warn("Cannot save: portfolio not loaded or in creation mode");
      return;
    }
    
    const updateData: Partial<InsertPortfolio> = {
      content: {
        blocks: contentBlocks,
        template: portfolio.template
      }
    };
    
    updateMutation.mutate(updateData);
  };

  const handlePreview = () => {
    setViewMode(viewMode === 'preview' ? 'edit' : 'preview');
    setEditingBlockId(null);
    setSelectedBlockId(null);
  };

  const handleBack = () => {
    window.location.href = "/";
  };

  // Function to update content block
  const updateContentBlock = (blockId: string, newContent: string) => {
    setContentBlocks(prev => 
      prev.map(block => 
        block.id === blockId ? { ...block, content: newContent } : block
      )
    );
  };

  // Function to handle block click
  const handleBlockClick = (blockId: string) => {
    setSelectedBlockId(blockId);
    if (blockId !== editingBlockId) {
      setEditingBlockId(null); // Stop editing other blocks
    }
  };

  // Function to start editing a block
  const handleBlockDoubleClick = (blockId: string) => {
    setEditingBlockId(blockId);
    setSelectedBlockId(blockId);
  };

  // Function to stop editing
  const handleStopEditing = () => {
    setEditingBlockId(null);
  };

  // Get selected block
  const selectedBlock = selectedBlockId ? contentBlocks.find(block => block.id === selectedBlockId) : null;

  // Function to handle property changes
  const handlePropertyChange = (property: string, value: string) => {
    if (!selectedBlockId) return;
    
    if (property === 'content') {
      updateContentBlock(selectedBlockId, value);
    } else {
      updateBlockStyle(selectedBlockId, { [property]: value });
    }
  };

  const renderCanvasContent = () => (
    <div className="space-y-6">
      {contentBlocks.map((block) => {
        const isSelected = selectedBlockId === block.id;
        const isEditing = editingBlockId === block.id;
        
        return (
          <div
            key={block.id}
            style={block.style}
            className={`${viewMode === 'edit' ? 'cursor-pointer' : ''} rounded transition-all ${
              isSelected && viewMode === 'edit'
                ? "outline outline-2 outline-primary bg-primary/5" 
                : viewMode === 'edit' ? "hover:outline hover:outline-2 hover:outline-primary/50" : ""
            }`}
            onClick={() => viewMode === 'edit' && handleBlockClick(block.id)}
            onDoubleClick={() => viewMode === 'edit' && handleBlockDoubleClick(block.id)}
          >
            {block.type === 'text' && (
              isEditing && viewMode === 'edit' ? (
                <textarea
                  value={block.content}
                  onChange={(e) => updateContentBlock(block.id, e.target.value)}
                  onBlur={handleStopEditing}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleStopEditing();
                    }
                    if (e.key === 'Escape') {
                      handleStopEditing();
                    }
                  }}
                  className="w-full min-h-[3rem] p-2 border-0 bg-transparent resize-none focus:outline-none"
                  style={block.style}
                  autoFocus
                  data-testid={`input-edit-text-${block.id}`}
                />
              ) : (
                <div data-testid={`text-block-${block.id}`}>{block.content}</div>
              )
            )}
            {block.type === 'section' && (
              isEditing && viewMode === 'edit' ? (
                <input
                  type="text"
                  value={block.content}
                  onChange={(e) => updateContentBlock(block.id, e.target.value)}
                  onBlur={handleStopEditing}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleStopEditing();
                    }
                    if (e.key === 'Escape') {
                      handleStopEditing();
                    }
                  }}
                  className="w-full p-1 border-0 bg-transparent focus:outline-none"
                  style={block.style}
                  autoFocus
                  data-testid={`input-edit-section-${block.id}`}
                />
              ) : (
                <h2 data-testid={`section-block-${block.id}`}>{block.content}</h2>
              )
            )}
            {block.type === 'image' && (
              <div className="w-full h-32 bg-muted rounded flex items-center justify-center" data-testid={`image-block-${block.id}`}>
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            {isSelected && viewMode === 'edit' && (
              <div className="absolute top-0 right-0 -mt-2 -mr-2">
                <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  {isEditing ? "Editing" : "Selected"}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // Show creation form if creating new portfolio
  if (isCreating) {
    return (
      <div className="h-screen flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-background">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack} data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="font-heading text-xl font-semibold">Tạo Portfolio Mới</h1>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="font-heading text-center">Thông Tin Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Nhập tiêu đề portfolio"
                    data-testid="input-portfolio-title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Mô tả ngắn về portfolio của bạn"
                    data-testid="textarea-portfolio-description"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="template">Mẫu thiết kế</Label>
                  <select
                    id="template"
                    value={formData.template}
                    onChange={(e) => setFormData(prev => ({ ...prev, template: e.target.value }))}
                    className="w-full p-2 border border-input rounded-md bg-background"
                    data-testid="select-portfolio-template"
                  >
                    {getAllTemplates().map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                  {currentTemplate && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {currentTemplate.description}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                    Hủy
                  </Button>
                  <Button type="submit" className="flex-1" disabled={createMutation.isPending} data-testid="button-create-portfolio">
                    {createMutation.isPending ? "Tạo..." : "Tạo Portfolio"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // Show loading state for editing mode
  if (portfolioId && isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải portfolio...</p>
        </div>
      </div>
    );
  }
  
  // Show editor UI for editing mode
  return (
    <div className="h-screen flex flex-col">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack} data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="portfolio-title" className="sr-only">Portfolio Title</Label>
            <Input
              id="portfolio-title"
              value={portfolio?.title || formData.title || "Portfolio"}
              onChange={(e) => {
                if (portfolio) {
                  // Handle editing mode
                  console.log("Update portfolio title", e.target.value);
                } else {
                  // Handle creation mode
                  setFormData(prev => ({ ...prev, title: e.target.value }));
                }
              }}
              className="font-heading font-semibold border-none px-2 py-1 h-auto bg-transparent focus-visible:bg-background focus-visible:border-input"
              data-testid="input-portfolio-title"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePreview} data-testid="button-preview">
            <Eye className="h-4 w-4 mr-2" />
            {viewMode === 'preview' ? 'Edit' : 'Preview'}
          </Button>
          <Button 
            onClick={handleSave} 
            data-testid="button-save"
            disabled={updateMutation.isPending || (!portfolio || isCreating)}
          >
            <Save className="h-4 w-4 mr-2" />
            {updateMutation.isPending ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Tools */}
        <div className="w-80 border-r bg-card">
          <div className="p-4">
            <h3 className="font-heading font-semibold mb-4">Design Tools</h3>
            
            {/* Tool Palette */}
            <div className="space-y-2 mb-6">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleToolSelect(tool.id)}
                  data-testid={`button-tool-${tool.id}`}
                >
                  <tool.icon className="h-4 w-4 mr-2" />
                  {tool.label}
                </Button>
              ))}
            </div>

            {/* Content Library */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Content Blocks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm h-8" 
                  data-testid="button-add-header"
                  onClick={() => addContentBlock('section', 'New Header', { fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' })}
                >
                  <Plus className="h-3 w-3 mr-2" />
                  Header
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm h-8" 
                  data-testid="button-add-paragraph"
                  onClick={() => addContentBlock('text', 'Click to edit this text...', { fontSize: '16px', lineHeight: '1.6', marginBottom: '15px' })}
                >
                  <Plus className="h-3 w-3 mr-2" />
                  Paragraph
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm h-8" 
                  data-testid="button-add-image"
                  onClick={() => addContentBlock('image', '', { width: '100%', height: '200px', marginBottom: '15px' })}
                >
                  <Plus className="h-3 w-3 mr-2" />
                  Image
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm h-8" 
                  data-testid="button-add-gallery"
                  onClick={() => addContentBlock('image', '', { width: '100%', height: '150px', marginBottom: '15px' })}
                >
                  <Plus className="h-3 w-3 mr-2" />
                  Gallery
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1">
          <A4Canvas zoom={zoom} onZoomChange={setZoom}>
            {renderCanvasContent()}
          </A4Canvas>
        </div>

        {/* Right Sidebar - Properties */}
        {viewMode === 'edit' && (
          <div className="w-80 border-l bg-card">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-4 w-4" />
                <h3 className="font-heading font-semibold">Properties</h3>
              </div>
              
              {selectedBlock ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">
                        {selectedBlock.type === 'text' ? 'Text Properties' : 
                         selectedBlock.type === 'section' ? 'Header Properties' : 'Image Properties'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {(selectedBlock.type === 'text' || selectedBlock.type === 'section') && (
                        <>
                          <div>
                            <Label htmlFor="font-size" className="text-xs">Font Size</Label>
                            <Input 
                              id="font-size" 
                              value={selectedBlock.style?.fontSize || ''}
                              onChange={(e) => handlePropertyChange('fontSize', e.target.value)}
                              placeholder="16px" 
                              className="h-8" 
                              data-testid="input-font-size" 
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="text-color" className="text-xs">Color</Label>
                            <Input 
                              id="text-color" 
                              value={selectedBlock.style?.color || ''}
                              onChange={(e) => handlePropertyChange('color', e.target.value)}
                              placeholder="#000000" 
                              className="h-8" 
                              data-testid="input-text-color" 
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="font-weight" className="text-xs">Font Weight</Label>
                            <select
                              id="font-weight"
                              value={selectedBlock.style?.fontWeight || 'normal'}
                              onChange={(e) => handlePropertyChange('fontWeight', e.target.value)}
                              className="w-full h-8 px-2 border border-input rounded-md bg-background"
                              data-testid="select-font-weight"
                            >
                              <option value="normal">Normal</option>
                              <option value="bold">Bold</option>
                              <option value="600">Semi Bold</option>
                              <option value="300">Light</option>
                            </select>
                          </div>
                          
                          <div>
                            <Label htmlFor="text-align" className="text-xs">Text Align</Label>
                            <select
                              id="text-align"
                              value={selectedBlock.style?.textAlign || 'left'}
                              onChange={(e) => handlePropertyChange('textAlign', e.target.value)}
                              className="w-full h-8 px-2 border border-input rounded-md bg-background"
                              data-testid="select-text-align"
                            >
                              <option value="left">Left</option>
                              <option value="center">Center</option>
                              <option value="right">Right</option>
                              <option value="justify">Justify</option>
                            </select>
                          </div>
                        </>
                      )}
                      
                      <div>
                        <Label htmlFor="text-content" className="text-xs">Content</Label>
                        <Textarea 
                          id="text-content"
                          value={selectedBlock.content || ''}
                          onChange={(e) => handlePropertyChange('content', e.target.value)}
                          placeholder="Enter content..."
                          className="resize-none h-20"
                          data-testid="textarea-content"
                        />
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => deleteContentBlock(selectedBlockId!)}
                          data-testid="button-delete-block"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            const blockIndex = contentBlocks.findIndex(b => b.id === selectedBlockId);
                            if (blockIndex > 0) {
                              const newBlocks = [...contentBlocks];
                              [newBlocks[blockIndex], newBlocks[blockIndex - 1]] = [newBlocks[blockIndex - 1], newBlocks[blockIndex]];
                              setContentBlocks(newBlocks);
                            }
                          }}
                          data-testid="button-move-up"
                        >
                          <ArrowUp className="h-3 w-3 mr-1" />
                          Up
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            const blockIndex = contentBlocks.findIndex(b => b.id === selectedBlockId);
                            if (blockIndex < contentBlocks.length - 1) {
                              const newBlocks = [...contentBlocks];
                              [newBlocks[blockIndex], newBlocks[blockIndex + 1]] = [newBlocks[blockIndex + 1], newBlocks[blockIndex]];
                              setContentBlocks(newBlocks);
                            }
                          }}
                          data-testid="button-move-down"
                        >
                          <ArrowDown className="h-3 w-3 mr-1" />
                          Down
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Select a content block to edit its properties</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}