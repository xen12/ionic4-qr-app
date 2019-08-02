import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  lat:number;
  lng:number;

  constructor( ) {
    this.lat = -17.4067855;
    this.lng = -66.1805648;
  }

  ngOnInit() {
  }

}
