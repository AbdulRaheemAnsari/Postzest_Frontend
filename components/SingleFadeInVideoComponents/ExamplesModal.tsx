import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ExamplesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExamplesModal = ({ open, onOpenChange }: ExamplesModalProps) => {
  const examples = [
    {
      title: "Product Showcase",
      description: "Elegant fade-in effect for product reveals",
      thumbnail:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    },
    {
      title: "Quote Animation",
      description: "Inspirational quotes with smooth transitions",
      thumbnail:
        "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=400&h=300&fit=crop",
    },
    {
      title: "Brand Reveal",
      description: "Professional logo and brand introductions",
      thumbnail:
        "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=400&h=300&fit=crop",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Viral Examples</DialogTitle>
          <DialogDescription>
            See how others have used this template to create engaging fade-in
            videos
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {examples.map((example, index) => (
            <div
              key={index}
              className="group cursor-pointer rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={example.thumbnail}
                  alt={example.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-sm font-medium">
                    Click to preview
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  {example.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {example.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
