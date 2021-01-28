// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Class<T = any> = new (...args: any[]) => T;

export interface InversifyBindListConfig {
    alias?: symbol;
    component: Class;
}
