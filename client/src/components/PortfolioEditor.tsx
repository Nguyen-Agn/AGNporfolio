import { useState } from "react";
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
  Settings
} from "lucide-react";
import A4Canvas from "./A4Canvas";

interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'section';
  content: string;
  style?: Record<string, any>;
}

export default function PortfolioEditor() {
  const [portfolioTitle, setPortfolioTitle] = useState("My Portfolio");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  
  // todo: remove mock functionality
  const [contentBlocks] = useState<ContentBlock[]>([
    {
      id: "1",
      type: "text",
      content: "John Doe",
      style: { fontSize: "32px", fontWeight: "bold", textAlign: "center" }
    },
    {
      id: "2", 
      type: "text",
      content: "Creative Designer & Developer",
      style: { fontSize: "18px", color: "#8B5CF6", textAlign: "center", marginBottom: "20px" }
    },
    {
      id: "3",
      type: "section",
      content: "About Me",
      style: { fontSize: "20px", fontWeight: "600", marginBottom: "10px" }
    },
    {
      id: "4",
      type: "text", 
      content: "Passionate creative with 5+ years of experience in digital design and front-end development. I love creating beautiful, functional experiences that make a difference.",
      style: { fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }
    }
  ]);

  const tools = [
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'image', icon: Image, label: 'Image' },
    { id: 'section', icon: Square, label: 'Section' }
  ];

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(selectedTool === toolId ? null : toolId);
    console.log(`Tool ${toolId} selected`);
  };

  const handleSave = () => {
    console.log("Portfolio saved");
  };

  const handlePreview = () => {
    console.log("Preview portfolio");
  };

  const handleBack = () => {
    console.log("Back to dashboard");
  };

  const renderCanvasContent = () => (
    <div className="space-y-6">
      {contentBlocks.map((block) => (
        <div
          key={block.id}
          style={block.style}
          className="cursor-pointer hover:outline hover:outline-2 hover:outline-primary/50 rounded"
          onClick={() => console.log(`Block ${block.id} selected`)}
        >
          {block.type === 'text' && <div>{block.content}</div>}
          {block.type === 'section' && <h2>{block.content}</h2>}
          {block.type === 'image' && (
            <div className="w-full h-32 bg-muted rounded flex items-center justify-center">
              <Image className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>
  );

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
              value={portfolioTitle}
              onChange={(e) => setPortfolioTitle(e.target.value)}
              className="font-heading font-semibold border-none px-2 py-1 h-auto bg-transparent focus-visible:bg-background focus-visible:border-input"
              data-testid="input-portfolio-title"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePreview} data-testid="button-preview">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} data-testid="button-save">
            <Save className="h-4 w-4 mr-2" />
            Save
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
                <Button variant="outline" className="w-full justify-start text-sm h-8" data-testid="button-add-header">
                  <Plus className="h-3 w-3 mr-2" />
                  Header
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm h-8" data-testid="button-add-paragraph">
                  <Plus className="h-3 w-3 mr-2" />
                  Paragraph
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm h-8" data-testid="button-add-image">
                  <Plus className="h-3 w-3 mr-2" />
                  Image
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm h-8" data-testid="button-add-gallery">
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
        <div className="w-80 border-l bg-card">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-4 w-4" />
              <h3 className="font-heading font-semibold">Properties</h3>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Text Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="font-size" className="text-xs">Font Size</Label>
                  <Input id="font-size" placeholder="16px" className="h-8" data-testid="input-font-size" />
                </div>
                
                <div>
                  <Label htmlFor="text-color" className="text-xs">Color</Label>
                  <Input id="text-color" placeholder="#000000" className="h-8" data-testid="input-text-color" />
                </div>
                
                <div>
                  <Label htmlFor="text-content" className="text-xs">Content</Label>
                  <Textarea 
                    id="text-content"
                    placeholder="Enter text content..."
                    className="resize-none h-20"
                    data-testid="textarea-content"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}