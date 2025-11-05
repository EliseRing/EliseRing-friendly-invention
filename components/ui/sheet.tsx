import * as React from "react";
import { X } from "../Icons";

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Sheet({ open, onOpenChange, children }: SheetProps) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

const SheetContext = React.createContext<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>({});

function SheetTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const { onOpenChange } = React.useContext(SheetContext);
  
  const handleClick = () => {
    onOpenChange?.(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
    } as any);
  }

  return <button onClick={handleClick}>{children}</button>;
}

function SheetContent({ className, children, side = "right" }: { 
  className?: string; 
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}) {
  const { open, onOpenChange } = React.useContext(SheetContext);

  if (!open) return null;

  const sideClasses = {
    right: "right-0 top-0 h-full w-3/4 max-w-sm",
    left: "left-0 top-0 h-full w-3/4 max-w-sm",
    top: "top-0 left-0 right-0 h-auto",
    bottom: "bottom-0 left-0 right-0 h-auto",
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={() => onOpenChange?.(false)}
      />
      <div
        className={cn(
          "fixed z-50 bg-white shadow-lg p-6 flex flex-col",
          sideClasses[side],
          className
        )}
      >
        <button
          onClick={() => onOpenChange?.(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </>
  );
}

function SheetHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col space-y-2 mb-4", className)}>
      {children}
    </div>
  );
}

function SheetTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  );
}

function SheetDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={cn("text-sm text-gray-500", className)}>
      {children}
    </p>
  );
}

function SheetClose({ className, children }: { className?: string; children: React.ReactNode }) {
  const { onOpenChange } = React.useContext(SheetContext);
  
  return (
    <button
      onClick={() => onOpenChange?.(false)}
      className={className}
    >
      {children}
    </button>
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
};
