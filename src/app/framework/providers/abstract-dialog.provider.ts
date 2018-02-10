export abstract class AbstractDialogProvider {
    abstract alert(text: string, title?: string): Promise<void>;
    abstract confirm(text: string, title?: string): Promise<boolean>;
    abstract prompt(text: string, def?: string, title?: string): Promise<string>;
}
