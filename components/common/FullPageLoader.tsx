"use client";

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/70 backdrop-blur-lg">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-primary border-border"></div>
    </div>
  );
}
