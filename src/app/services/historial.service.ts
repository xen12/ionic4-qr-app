import { Injectable } from '@angular/core';

import { ScanData } from '../models/scan-data.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private _historial:ScanData[] = [];

  constructor() { }

  agregarHistorial( texto:string ) {
    let data = new ScanData( texto );

    this._historial.unshift(data);

    console.log(this._historial);
  }

  cargarHistorial() {
    return this._historial;
  }
}
