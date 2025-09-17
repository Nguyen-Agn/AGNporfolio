import logoUrl from "@/asset/logoX16.png";

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <img src={logoUrl} alt="@GN Logo" className="h-6 w-6" />
            <span className="font-heading font-bold text-lg text-primary">@GN</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © 2024 @GN Portfolio Builder. Tất cả quyền được bảo lưu.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Author: <span className="font-medium">Thanh Nguyen</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}