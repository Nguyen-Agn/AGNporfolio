/**
 * PDF Export Utility
 * Provides functions for exporting portfolio content to PDF using browser print functionality
 * with optimized styling for A4 format
 */

/**
 * Handles PDF export using browser's print functionality
 * Dynamically injects print-specific styles and opens print dialog
 * @param printStyles - Custom CSS styles for print media
 */
export function exportToPDF(): void {
  // Print-specific styles for A4 format
  const printStyles = `
    @media print {
      /* Hide everything by default */
      body * { visibility: hidden; }
      
      /* Show only print area content */
      .print-area, .print-area * { visibility: visible; }
      
      /* Position print area at page top */
      .print-area { 
        position: absolute; 
        left: 0; 
        top: 0; 
        width: 100%; 
        background: white !important;
        margin: 0;
        padding: 10mm;
      }
      
      /* Hide non-print elements */
      .no-print { display: none !important; }
      
      /* A4 page setup */
      @page { 
        size: A4; 
        margin: 0; 
      }
      
      /* Ensure colors print correctly */
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      /* Prevent page breaks within content blocks */
      .content-block {
        break-inside: avoid;
        page-break-inside: avoid;
      }
    }
  `;
  
  // Create and inject style element
  const styleElement = document.createElement('style');
  styleElement.id = 'pdf-export-styles';
  styleElement.textContent = printStyles;
  document.head.appendChild(styleElement);
  
  // Function to clean up styles
  const cleanup = () => {
    const existingStyles = document.getElementById('pdf-export-styles');
    if (existingStyles) {
      document.head.removeChild(existingStyles);
    }
    // Remove event listeners
    window.removeEventListener('afterprint', cleanup);
  };
  
  // Set up cleanup after print dialog closes
  window.addEventListener('afterprint', cleanup);
  
  // Trigger print dialog
  window.print();
}

/**
 * Forces preview mode during export to ensure clean output without edit overlays
 * @param currentViewMode - Current view mode state
 * @param setViewMode - Function to set view mode
 */
export function exportToPDFWithPreview(
  currentViewMode: string,
  setViewMode: (mode: 'edit' | 'preview') => void
): void {
  const wasInEditMode = currentViewMode === 'edit';
  
  // Switch to preview mode for clean print
  if (wasInEditMode) {
    setViewMode('preview');
  }
  
  // Small delay to ensure DOM updates before printing
  setTimeout(() => {
    exportToPDF();
    
    // Restore edit mode after print if needed
    if (wasInEditMode) {
      // Listen for afterprint to restore mode
      const restoreMode = () => {
        setViewMode('edit');
        window.removeEventListener('afterprint', restoreMode);
      };
      window.addEventListener('afterprint', restoreMode);
    }
  }, 100);
}