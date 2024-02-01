type NonNullableProps<T> = {
    [P in keyof T]: null extends T[P] ? never : P;
}[keyof T];

export function stripUndefined<T>(obj: T): Pick<T, NonNullableProps<T>> {
    const result = {} as T;

    for (const key in obj) if (obj[key] !== undefined) result[key] = obj[key];

    return result;
}
