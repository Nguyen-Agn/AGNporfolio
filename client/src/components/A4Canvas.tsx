import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface A4CanvasProps {
  children?: React.ReactNode;
  zoom?: number;
  onZoomChange?: (zoom: number) => void;
}

export default function A4Canvas({ children, zoom = 100, onZoomChange }: A4CanvasProps) {
  const [currentZoom, setCurrentZoom] = useState(zoom);

  const handleZoom = (newZoom: number) => {
    const clampedZoom = Math.max(25, Math.min(200, newZoom));
    setCurrentZoom(clampedZoom);
    onZoomChange?.(clampedZoom);
  };

  const resetZoom = () => handleZoom(100);

  return (
    <div className="flex flex-col h-full">
      {/* Zoom Controls */}
      <div className="flex items-center justify-center gap-2 p-4 border-b">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleZoom(currentZoom - 25)}
          data-testid="button-zoom-out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <span className="text-sm font-medium min-w-[60px] text-center">
          {currentZoom}%
        </span>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleZoom(currentZoom + 25)}
          data-testid="button-zoom-in"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={resetZoom}
          data-testid="button-reset-zoom"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto bg-muted/50 p-8">
        <div className="flex justify-center">
          <Card 
            className="bg-white shadow-lg"
            style={{
              width: `${(210 * currentZoom) / 100}mm`,
              height: `${(297 * currentZoom) / 100}mm`,
              minHeight: `${(297 * currentZoom) / 100}mm`,
              transform: `scale(${Math.min(1, currentZoom / 100)})`,
              transformOrigin: "top center"
            }}
            data-testid="canvas-a4-page"
          >
            <div className="p-8 h-full">
              {children || (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                    <p className="font-medium">Start creating your portfolio</p>
                    <p className="text-sm">Add content blocks to build your design</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}