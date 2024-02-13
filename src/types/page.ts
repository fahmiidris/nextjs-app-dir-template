import type { TParams, TSearchParams } from '@/types/params';

export interface TPageProps<P = TParams, SP = TSearchParams> {
    params: P;
    searchParams: SP;
}
