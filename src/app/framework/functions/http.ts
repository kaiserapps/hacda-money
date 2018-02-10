import { AbstractStorageProvider } from '../providers/abstract-storage.provider';
import { Headers, Response } from '@angular/http';

export function handleError(err: any) {
    if (err instanceof Response) {
        let body: any;
        const text = err.text();
        try {
            body = JSON.parse(text);
        }
        catch (err) {
            body = text;
        }

        if (body && body.error) {
            return body.error;
        }
        else if (text) {
            return text;
        }
        else {
            return err.statusText;
        }
    }
    else {
        return err;
    }
}
