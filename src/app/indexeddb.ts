import { Observable } from "rxjs";

export interface Indexeddb {
    sendcreate<T>(listItem: any): Observable<any>;
    getAll<T>(): Observable<void>;
    qtRegistry<T>(): Observable<number>;
}
