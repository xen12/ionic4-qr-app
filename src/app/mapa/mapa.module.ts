import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

// mapas
import { AgmCoreModule } from '@agm/core';

import { MapaPage } from './mapa.page';

const routes: Routes = [
  {
    path: '',
    component: MapaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC5SyiRC-r521AR-UdoJxop6Bsp7zzD6KA'
    })
  ],
  declarations: [MapaPage]
})
export class MapaPageModule {}
