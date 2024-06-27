import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { LoaderCircle } from 'lucide-react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/classname';

const buttonVariants = cva(
    [
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background ease-in-out duration-200',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
    ],
    {
        variants: {
            variant: {
                default: ['bg-primary text-primary-foreground', 'hover:bg-primary/90'],
                secondary: ['bg-secondary text-secondary-foreground', 'hover:bg-secondary/80'],
                outline: ['border border-input bg-background', ' hover:bg-accent hover:text-accent-foreground'],
                ghost: ['hover:bg-accent', 'hover:text-accent-foreground'],
                success: ['bg-success text-success-foreground hover:bg-success/90'],
                warning: ['bg-warning text-warning-foreground hover:bg-warning/90'],
                info: ['bg-info text-info-foreground hover:bg-info/90'],
                danger: ['bg-danger text-danger-foreground hover:bg-danger/90'],
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
            isLoading: {
                true: 'opacity-75 pointer-events-none',
                false: 'opacity-100 pointer-events-auto',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            isLoading: false,
        },
    }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    type: 'button' | 'submit' | 'reset';
    isLoadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function _Button(
    { children, className, variant, size, asChild = false, isLoading, isLoadingText, disabled, ...props },
    ref
) {
    const Component = asChild ? Slot : 'button';

    return (
        <Component
            className={cn(buttonVariants({ variant, size, isLoading, className }))}
            disabled={(disabled || isLoading) ?? false}
            ref={ref}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <LoaderCircle className="size-4 animate-spin" />
                    <span>{isLoadingText ?? 'Loading...'}</span>
                </div>
            ) : (
                children
            )}
        </Component>
    );
});

export default Button;
