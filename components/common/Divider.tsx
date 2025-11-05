import React from "react";

interface DividerProps {
  text?: string;
  className?: string;
  textClassName?: string;
}

const Divider: React.FC<DividerProps> = ({
  text,
  className,
  textClassName,
}) => {
  return (
    <div className={`flex items-center w-full ${className || ""}`}>
      <div className="flex-grow h-px bg-muted-foreground/40" />
      {text && (
        <span
          className={`px-3 text-sm text-muted-foreground whitespace-nowrap ${textClassName}`}
        >
          {text}
        </span>
      )}
      {text && <div className="flex-grow h-px bg-muted-foreground/40" />}
    </div>
  );
};

export default Divider;
