import { Injectable } from '@angular/core';

import { AbstractStorageProvider } from './abstract-storage.provider';

@Injectable()
export class LocalStorageProvider implements AbstractStorageProvider {
    public getItem<T>(key: string): T {
        const val = localStorage.getItem(key);
        if (val) {
            try {
                return <T>JSON.parse(val);
            }
            catch (ex) {
                return null;
            }
        }
        else {
            return null;
        }
    }

    public setItem<T>(key: string, item: T): void {
        localStorage.setItem(key, JSON.stringify(item === undefined ? null : item));
    }

    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    public clear(): void {
        localStorage.clear();
    }
}
