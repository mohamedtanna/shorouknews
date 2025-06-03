import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  isLoading = false;
  constructor(private alertCtrl: AlertController) { }
  async presentAlert(message, title, sub_title) {
    this.isLoading = false;
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: sub_title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
