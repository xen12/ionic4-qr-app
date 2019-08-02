import { Component, OnInit } from '@angular/core';

import { HistorialService } from '../services/historial.service';
import { ScanData } from '../models/scan-data.model';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.page.html',
  styleUrls: ['./guardados.page.scss'],
})
export class GuardadosPage implements OnInit {

  historial:ScanData[] = [];

  constructor( private _historial:HistorialService ) { }

  ngOnInit() {
    console.log(this._historial.cargarHistorial());
    this.historial = this._historial.cargarHistorial();
  }

  abrirScan( index:number ) {
    this._historial.abrirScan(index);
  }

}
