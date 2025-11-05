import { Bold, Italic, Link, Smile, AtSign } from "lucide-react";

export default function FormattingToolbar() {
  return (
    <div className="mt-1.5 flex items-center gap-0.5">
      <button className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
        <Bold className="h-3.5 w-3.5" />
      </button>
      <button className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
        <Italic className="h-3.5 w-3.5" />
      </button>
      <button className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
        <Link className="h-3.5 w-3.5" />
      </button>
      <button className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
        <Smile className="h-3.5 w-3.5" />
      </button>
      <button className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
        <AtSign className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
