import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  lat:number;
  lng:number;

  constructor( public navParams:NavParams, private modalCtrl:ModalController ) {
    // this.lat = -17.4067855;
    // this.lng = -66.1805648;

    let coordsArray = this.navParams.get("coords").split(",");
    this.lat = Number( coordsArray[0].replace("geo:", "") );
    this.lng = Number( coordsArray[1] );

    console.log( this.lat + " - " + this.lng );
  }

  ngOnInit() {
  }

  cerrar_modal() {
    this.modalCtrl.dismiss({

    });
  }

}
