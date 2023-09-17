import clsx, { type ClassArray } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function clsxm(...classNames: ClassArray): string {
    return twMerge(clsx(classNames));
}
