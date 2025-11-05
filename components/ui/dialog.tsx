import * as React from "react";
import { X } from "../Icons";

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

const DialogContext = React.createContext<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>({});

function DialogTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const { onOpenChange } = React.useContext(DialogContext);
  
  const handleClick = () => {
    onOpenChange?.(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
    } as any);
  }

  return <div onClick={handleClick}>{children}</div>;
}

function DialogContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const { open, onOpenChange } = React.useContext(DialogContext);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4">
        <div
          className={cn(
            "relative bg-white rounded-lg shadow-lg p-6",
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
      </div>
    </>
  );
}

function DialogHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}>
      {children}
    </div>
  );
}

function DialogTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  );
}

function DialogDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={cn("text-sm text-gray-500", className)}>
      {children}
    </p>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
};
