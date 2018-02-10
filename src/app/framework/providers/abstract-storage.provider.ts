export abstract class AbstractStorageProvider {
    abstract getItem<T>(key: string): T;
    abstract setItem<T>(key: string, item: T): void;
    abstract removeItem(key: string): void;
    abstract clear(): void;
}
