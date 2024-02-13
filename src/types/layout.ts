import type { PropsWithChildren } from 'react';

// import type { TParams, TSearchParams } from '@/types/params';

// export type TLayoutProps<P = TParams, SP = TSearchParams> = PropsWithChildren<{
//     params: P;
//     searchParams: SP;
// }>;

export type TLayoutProps<T = unknown> = PropsWithChildren<T>;
