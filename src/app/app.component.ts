import { Component } from '@angular/core';
import { EstadosService } from './estados.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(protected estadosService: EstadosService) {
    estadosService.getEstados();
  }
}
