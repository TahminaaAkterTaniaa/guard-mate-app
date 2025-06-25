import { ButtonHTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-400",
        destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
        outline: "bg-transparent border border-slate-200 hover:bg-slate-100 focus:ring-slate-400",
        subtle: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-900 focus:ring-slate-400",
        link: "bg-[#3663F5] text-white hover:bg-[#3663F5]/90 focus:ring-[#3663F5] shadow-md",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary",
        whitePrimary: "bg-white text-primary border border-[#3663F5] hover:bg-[#f0f4ff] focus:ring-[#3663F5] font-bold",

      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-12 px-8 rounded-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, isLoading = false, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
