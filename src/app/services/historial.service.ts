import { Injectable } from '@angular/core';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { ScanData } from '../models/scan-data.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private _historial:ScanData[] = [];

  constructor( private iab:InAppBrowser ) { }

  agregarHistorial( texto:string ) {
    let data = new ScanData( texto );

    this._historial.unshift(data);

    //console.log(this._historial);

    this.abrirScan(0);
  }

  abrirScan( index:number ) {
    let scanData = this._historial[index];  

    switch(scanData.tipo) {
      case "http":
        this.iab.create(scanData.info, "_system");
        break;
      default:
        console.log("Tipo no soportado");
    }
  }

  cargarHistorial() {
    return this._historial;
  }
}
