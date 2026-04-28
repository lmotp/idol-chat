export type Nullable<T> = T | null;

export type AsyncFn<TArgs extends unknown[] = [], TResult = void> = (...args: TArgs) => Promise<TResult>;

export type Dictionary<T = unknown> = Record<string, T>;
