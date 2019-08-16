import { Injectable } from '@angular/core';

import { ModalController, Platform, ToastController } from "@ionic/angular";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { ScanData } from '../models/scan-data.model';
import { MapaPage } from "../mapa/mapa.page";

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private _historial:ScanData[] = [];

  constructor( private iab:InAppBrowser, private modalCtrl:ModalController, private contacts:Contacts, private platform:Platform, private toastCtrl:ToastController, private emailComposer:EmailComposer ) { }

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
        //console.log(this._historial);
        break;
      case "contacto":
        this.crear_contacto( scanData.info );
        break;
      case "email":
        this.send_email(scanData.info);
        //this.send_email_link(scanData.info);
        break;
      default:
        //console.log(scanData.info);
        console.log("Tipo no soportado");
    }
  }

  private send_email( texto:string ) {
    let campos:any = this.parse_email( texto );
    
    if ( !this.platform.is("cordova") ) {
      console.warn("Estoy en la computadora, no enviar email.");
      return;
    }

    // this.emailComposer.isAvailable().then((available: boolean) =>{
    //   if(available) {
    //     //Now we know we can send
    //   }
    //  });

    let email = {
      to: campos[0].replace("TO:", ""),
      subject: campos[1].replace("SUB:", ""),
      body: campos[2].replace("BODY:", "")
    }

    // add alias
    // this.emailComposer.addAlias('gmail', 'com.google.android.gm');
    
    // // then use alias when sending email
    // this.emailComposer.open({
    //   app: 'gmail'
    // });
    
    this.emailComposer.open(email);
  }

  private send_email_link( texto:string ) {
    let htmlLink = texto;

    htmlLink = htmlLink.replace("MATMSG:TO:", "mailto:");
    htmlLink = htmlLink.replace(";SUB:", "?subject=");
    htmlLink = htmlLink.replace(";BODY:", "&body=");
    htmlLink = htmlLink.replace(";;", "");
    htmlLink = htmlLink.replace(/ /g, "%20");

    console.log(htmlLink);

    this.iab.create( htmlLink, "_system" );
  }

  private crear_contacto( texto:string ) {
    let campos:any = this.parse_vcard( texto );
    console.log( campos );

    let nombre = campos.fn;
    let tel = campos.tel[0].value[0];
    
    if ( !this.platform.is("cordova") ) {
      console.warn("Estoy en la computadora, no puedo crear contacto.");
      return;
    }

    let contact:Contact = this.contacts.create();
    contact.name = new ContactName(null, nombre);
    contact.phoneNumbers = [ new ContactField('mobile', tel) ];
    
    contact.save().then(
      ()=> this.crear_toast("Contacto " + nombre + " creado!"),
      (error:any)=> console.error('Error guardando contacto.', error)
    );
  }

  private async crear_toast( mensaje:string ) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    });
    toast.present();
  }

  private parse_email( input:string ) {
    let result = (input.replace("MATMSG:", "")).split(";");
    return result;
  }

  private parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
  }

  cargarHistorial() {
    return this._historial;
  }
}
