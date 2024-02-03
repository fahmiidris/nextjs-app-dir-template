import { twMerge } from 'tailwind-merge';
import { clsx, type ClassArray } from 'clsx';

export function cn(...classNames: ClassArray): string {
    return twMerge(clsx(classNames));
}
