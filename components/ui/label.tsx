import * as React from "react";

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none",
        className
      )}
      {...props}
    />
  );
}

export { Label };
