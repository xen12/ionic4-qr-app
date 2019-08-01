import { Component } from '@angular/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private barcodeScanner:BarcodeScanner ) {}

  scan() {
    console.log("Realizando scan");

    this.barcodeScanner.scan().then( barcodeData => {
      console.log('BarcodeData: ' + barcodeData);
    }).catch(err => {
      console.log('Error: ' + err);
    });
  }

}
