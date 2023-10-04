import { twMerge } from 'tailwind-merge';

import clsx, { type ClassArray } from 'clsx';

export default function clsxm(...classNames: ClassArray) {
    return twMerge(clsx(classNames));
}
