import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;

  constructor(public loadingController: LoadingController) { }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: 'dots',
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss();
          // .then(() => console.log(''));
        }
      });
    });
  }

  async close() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
    // .then(() => console.log('dismissed'));
  }
}
