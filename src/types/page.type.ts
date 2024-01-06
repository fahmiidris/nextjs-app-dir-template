export type TPageProps<P = unknown, SP = Record<string, string | string[] | undefined>> = {
    params: P;
    searchParams: SP;
};
