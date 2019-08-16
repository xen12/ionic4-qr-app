import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// services
import { HistorialService } from './services/historial.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';

// mapas
import { AgmCoreModule } from '@agm/core';

import { MapaPage } from './mapa/mapa.page';

@NgModule({
  declarations: [AppComponent, MapaPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC5SyiRC-r521AR-UdoJxop6Bsp7zzD6KA'
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser,
    HistorialService,
    Contacts
  ],
  bootstrap: [AppComponent],
  entryComponents: [MapaPage]
})
export class AppModule {}
