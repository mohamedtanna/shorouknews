import { FireMessagingService } from 'src/services/fire-messaging-service';
import { Component } from '@angular/core';
import { AdsService } from '../../services/ads.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  _appVersion = '3.2.1';
  constructor(private ads: AdsService, private appVersion: AppVersion, private fcm: FireMessagingService) {
    this.appVersion.getVersionNumber().then(version => {
      this._appVersion = version;
    });
   }
  ionViewWillEnter(): void {
    setTimeout(() => {
      this.ads.listToClicksEvents();
    }, 2000);
  }

  async onClickAppVersion() {
    await this.fcm.onClickAppVersion();
  }

}
