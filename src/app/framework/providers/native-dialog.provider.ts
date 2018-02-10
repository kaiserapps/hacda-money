import { AbstractDialogProvider } from './abstract-dialog.provider';

export class NativeDialogProvider implements AbstractDialogProvider {
    public alert(text: string, title?: string): Promise<void> {
        alert(text);
        return Promise.resolve();
    }

    public confirm(text: string, title?: string): Promise<boolean> {
        if (confirm(text)) {
            return Promise.resolve(true);
        }
        else {
            return Promise.resolve(false);
        }
    }

    public prompt(text: string, def?: string, title?: string): Promise<string> {
        const result = prompt(text, def);
        return Promise.resolve(result);
    }
}
