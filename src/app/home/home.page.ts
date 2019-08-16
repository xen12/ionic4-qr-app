import { Component } from '@angular/core';

// plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// services
import { HistorialService } from '../services/historial.service';

// components
import { ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private barcodeScanner:BarcodeScanner, private toastCtrl:ToastController, private platform:Platform, private historial:HistorialService ) {}

  scan() {
    console.log("Realizando scan");

    if( !this.platform.is('cordova') ) {
      //this.historial.agregarHistorial("http://google.com");
      //this.historial.agregarHistorial("geo:-17.4067855,-66.1805648");
//       this.historial.agregarHistorial( `BEGIN:VCARD
// VERSION:2.1
// N:Kent;Clark
// FN:Clark Kent
// ORG:
// TEL;HOME;VOICE:12345
// TEL;TYPE=cell:67890
// ADR;TYPE=work:;;;
// EMAIL:clark@superman.com
// END:VCARD` );
      this.historial.agregarHistorial("MATMSG:TO:gus.xen.12@gmail.com;SUB:4-qrapp;BODY:probando qr para envio de email;;");
      return;
    }

    this.barcodeScanner.scan().then( barcodeData => {
      //console.log('BarcodeData: ' + barcodeData);
      console.log('result: ' + barcodeData.text);
      console.log('format: ' + barcodeData.format);
      console.log('cancelled : ' + barcodeData.cancelled);

      if( !barcodeData.cancelled && barcodeData.text != null ) {
        this.historial.agregarHistorial(barcodeData.text)
      }

    }).catch(err => {
      console.log('Error: ' + err);
      this.mostrarError('Error: ' + err);
      //this.mostrarError2();
    });
  }

  async mostrarError( mensaje:string ) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: 'top',
      duration: 2500
    });
    toast.present();
  }

  async mostrarError2(  ) {
    const toast = await this.toastCtrl.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }


}
