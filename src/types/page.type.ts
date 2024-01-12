type TDefaultParams = Record<string, string | string[] | undefined>;

export type TPageProps<P = TDefaultParams, SP = TDefaultParams> = {
    params: P;
    searchParams: SP;
};
