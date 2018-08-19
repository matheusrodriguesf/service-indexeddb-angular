import { Injectable } from '@angular/core';
import { estados } from 'estados-br'
import { ManagerLocalDb } from './manager-local-db';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  private managerdb: ManagerLocalDb;
  constructor() {
    this.managerdb = new ManagerLocalDb();
  }

  getEstados() {
    this.managerdb.createlocaldb('estados').subscribe((data) => {
      this.managerdb.qtRegistry().subscribe((quantidade) => {
        console.log('quantidade', quantidade);
      });
      if (estados) {
        estados.forEach(item => {
          this.managerdb.sendcreate(item).subscribe((dados: any) => { });
        });
        this.managerdb.getAll().subscribe((dados: any) => { });
      }
    });
  }
}
