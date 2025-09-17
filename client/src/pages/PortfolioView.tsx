import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Download } from "lucide-react";
import type { Portfolio } from "@shared/schema";
import { getTemplateById, type ContentBlock } from "@/lib/templates";
import { exportToPDF } from "@/lib/print";
import A4Canvas from "@/components/A4Canvas";
import { useState, useEffect } from "react";

/**
 * Portfolio View Page - Displays portfolio in read-only mode
 * Accessible at /portfolio/:id route for viewing published portfolios
 */
export default function PortfolioView() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [zoom, setZoom] = useState(100);

  // Fetch portfolio data
  const { data: portfolio, isLoading, error } = useQuery<Portfolio>({
    queryKey: [`/api/portfolios/s/${id}`],
    enabled: !!id,
  });

  // Load portfolio content when portfolio is loaded
  useEffect(() => {
    console.log(portfolio, isLoading, error)
    if (portfolio) {
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
  }, [portfolio]);

  // Navigation handlers
  const handleBack = () => {
    setLocation("/home");
  };

  /**
   * Handles PDF export using browser's print functionality
   * Opens print dialog with optimized styling for PDF output
   */
  const handleExportPDF = () => {
    exportToPDF();
  };

  const handleZoom = (newZoom: number) => {
    const clampedZoom = Math.max(25, Math.min(200, newZoom));
    setZoom(clampedZoom);
  };

  // Render canvas content in view-only mode
  const renderCanvasContent = () => (
    <div className="space-y-6">
      {contentBlocks.map((block) => (
        <div
          key={block.id}
          style={block.style}
          className="rounded content-block"
          data-testid={`view-block-${block.id}`}
        >
          {block.type === 'text' && (
            <div data-testid={`text-content-${block.id}`}>{block.content}</div>
          )}
          {block.type === 'section' && (
            <h2 data-testid={`section-content-${block.id}`}>{block.content}</h2>
          )}
          {block.type === 'image' && (
            <div className="w-full h-32 bg-muted rounded flex items-center justify-center" data-testid={`image-content-${block.id}`}>
              <span className="text-muted-foreground text-sm">Hình ảnh</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Không tìm thấy portfolio</h1>
          <p className="text-muted-foreground mb-4">Portfolio này không tồn tại hoặc đã bị xóa.</p>
          <Button onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Trở về trang chủ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Top Toolbar - View Mode */}
      <div className="flex items-center justify-between p-4 border-b bg-background no-print">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack} data-testid="button-back-view">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Trở về
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setLocation("/")} data-testid="button-home-view">
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-xl font-semibold">{portfolio.title}</h1>
            {portfolio.isPublished === true && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Đã xuất bản
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleExportPDF}
            data-testid="button-export-pdf"
          >
            <Download className="h-4 w-4 mr-2" />
            Tải PDF
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setLocation(`/editor/${portfolio._id}`)}
            data-testid="button-edit-from-view"
          >
            Chỉnh sửa
          </Button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* A4 Canvas with content */}
        <div className="flex-1 bg-muted/30 print-area">
          <A4Canvas 
            zoom={zoom} 
            onZoomChange={handleZoom}
          >
            {renderCanvasContent()}
          </A4Canvas>
        </div>
      </div>
    </div>
  );
}