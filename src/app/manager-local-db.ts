import { Observable, observable } from "rxjs";
import { Indexeddb } from "./indexeddb";

export class ManagerLocalDb implements Indexeddb {
    private indexeddb: IDBFactory;

    constructor() {
        this.indexeddb = window.indexedDB;
    }

    private openlocaldb(): any {
        if (!this.indexeddb) {
            throw 'Navegador sem suporte ao recurso de armazenamento local';
        } else {
            return this.indexeddb.open('localdb');
        }
    }

    createlocaldb(nomeTabela: any): Observable<any> {
        return Observable.create((observer: any) => {
            let request: IDBOpenDBRequest = this.openlocaldb();
            request.onupgradeneeded = () => {
                // console.log('Cria o chema');//TODO: Remover trecho de debug;
                let database: IDBDatabase = request.result;
                database.createObjectStore(nomeTabela, { autoIncrement: true });
                observer.next('data');
                observer.complete();
            };
            request.onsuccess = () => {
                // console.log('onsuccess'); //TODO: Remover trecho de debug;
                let database: IDBDatabase = request.result;
                database.close();
            };
            request.onerror = () => {
                // console.log('onerror'); //TODO: Remover trecho de debug;
                throw 'Erro';
            };
        });
    }

    sendcreate<T>(listItem: any): Observable<any> {
        return Observable.create((observer: any) => {
            let request: IDBOpenDBRequest = this.openlocaldb();
            request.onsuccess = () => {
                let database: IDBDatabase = request.result;
                let transaction = database.transaction(['estados'], 'readwrite');
                let objectStore = transaction.objectStore('estados');
                let objetRequest = objectStore.add(listItem);
                objetRequest.onsuccess = (evt: any) => {
                    observer.next(evt.target.result);
                    database.close();
                    observer.complete();
                };
            }
        });
    }

    getAll<T>(): Observable<void> {
        return Observable.create((observer: any) => {
            let request: IDBOpenDBRequest = this.openlocaldb();
            request.onsuccess = () => {
                let database: IDBDatabase = request.result;
                let transaction = database.transaction(['estados'], 'readonly');
                let objectStore = transaction.objectStore('estados');
                let objetRequest = objectStore.openCursor();
                objetRequest.onsuccess = (evt: any) => {
                    let cursor = evt.target.result;
                    if (cursor) {
                        console.log(cursor.value);
                        cursor.continue();
                    } else {
                        observer.next(evt.target.result);
                        database.close();
                        observer.complete();
                    }

                };
                objetRequest.onerror = () => {
                    throw 'Error';
                };
            };
        });
    }

    qtRegistry<T>(): Observable<number> {
        return Observable.create((data: any) => {
            let request: IDBOpenDBRequest = this.openlocaldb();
            request.onsuccess = () => {
                let database: IDBDatabase = request.result;
                let transaction = database.transaction(['estados'], 'readonly');
                let objectStore = transaction.objectStore('estados');
                let countRequest = objectStore.count();
                countRequest.onsuccess = () => {
                    data.next(countRequest.result);
                    database.close();
                    data.complete();
                };
            };
        });
    }
}

