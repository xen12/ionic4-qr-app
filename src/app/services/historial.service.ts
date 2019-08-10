import { Injectable } from '@angular/core';

import { ModalController } from "@ionic/angular";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { ScanData } from '../models/scan-data.model';
import { MapaPage } from "../mapa/mapa.page";

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private _historial:ScanData[] = [];

  constructor( private iab:InAppBrowser, private modalCtrl:ModalController ) { }

  agregarHistorial( texto:string ) {
    let data = new ScanData( texto );

    this._historial.unshift(data);

    //console.log(this._historial);

    this.abrirScan(0);
  }

  async abrirScan( index:number ) {
    let scanData = this._historial[index];  

    switch(scanData.tipo) {
      case "http":
        this.iab.create(scanData.info, "_system");
        break;
      case "geo":
        const modal = await this.modalCtrl.create({
          component: MapaPage,
          componentProps: {
            'coords': scanData.info
          }
        });
        await modal.present();
        console.log(this._historial);
        break;
      default:
        console.log("Tipo no soportado");
    }
  }

  cargarHistorial() {
    return this._historial;
  }
}
