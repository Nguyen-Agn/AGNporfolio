import A4Canvas from '../A4Canvas';

export default function A4CanvasExample() {
  // Mock content for demonstration
  const mockContent = (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold text-primary mb-2">John Doe</h1>
        <p className="text-lg text-muted-foreground">Creative Designer</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h2 className="font-heading text-lg font-semibold">About</h2>
          <p className="text-sm">Creative designer with 5+ years of experience in digital design and branding.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="font-heading text-lg font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {['Figma', 'Photoshop', 'Illustrator'].map(skill => (
              <span key={skill} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-96 border rounded-lg">
      <A4Canvas zoom={75}>
        {mockContent}
      </A4Canvas>
    </div>
  );
}