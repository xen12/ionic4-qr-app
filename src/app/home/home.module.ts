import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// services
import { HistorialService } from '../services/historial.service';

// components
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],
  providers: [BarcodeScanner, HistorialService]
})
export class HomePageModule {}
