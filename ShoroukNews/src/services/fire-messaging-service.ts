import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { DataService } from './data.service';
import { NetworkService, ConnectionStatus } from './network.service';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { asyncForEach } from '../utils/utils';
import { Device } from '@ionic-native/device/ngx';
import { environment } from 'src/environments/environment';

class AdditionalData {
  Url: string;
  Link: string;

  getAdditionalData(data: any): AdditionalData {
    const additionalData = new AdditionalData();
    additionalData.Url = data.url;
    additionalData.Link = data.link;

    console.log(additionalData.Url);
    console.log(additionalData.Link);
    return additionalData;
  }
}


@Injectable()
export class FireMessagingService {
  player_id: any;

  constructor(private fcm: FCM,
              private platform: Platform,
              private alertService: AlertService,
              private dataService: DataService,
              private networkService: NetworkService,
              private _http: HttpClient,
              private loading: LoadingService,
              private router: Router,
              private device: Device,
              private ionicNativeHttp: HTTP) {
  }

  async initFireMessaging(): Promise<any> {
    try {
      await this.platform.ready();
      if (this.platform.is('cordova')) {
        this.fcm.onNotification().subscribe(response => {
          if (response.wasTapped) {
            console.log('Received in background');
            console.log('background data', response);
            const data = response;
            const additionalDataObject = new AdditionalData();
            const receivedData = additionalDataObject.getAdditionalData(data);
            if (receivedData.Link) {
              this.router.navigateByUrl(receivedData.Link);
            } else {
              this.router.navigateByUrl('/home');
            }
          } else {
            console.log('Received in foreground');
            console.log('foreground data', response);
            const data = response;
            const additionalDataObject = new AdditionalData();
            const receivedData = additionalDataObject.getAdditionalData(data);
            if (receivedData.Link) {
              this.router.navigateByUrl(receivedData.Link);
            } else {
              this.router.navigateByUrl('/home');
            }
          }
        });
        this.player_id = await this.fcm.getToken().then();
        console.log('player_id', this.player_id);
        await this.createUserInfo();
        this.getAndUpdateTag().then(
        response => {
          const addedTags = response.filter(tag => tag !== 'all' && tag !== 'android' && tag !== 'ios');
          const defaultTags = response.filter(tag => tag === 'all' || tag === 'android' || tag === 'ios');
          if ((response.length <= 0 || (!!defaultTags && defaultTags.length > 0) &&
           (!addedTags || (!!addedTags && addedTags.length <= 0)))) {
            this.subScribeToAllSections();
          }
        });
      }
    } catch (e) {
      console.log('Error=>', e);
    }
  }

  async createUserInfo() {
    const end_point_url = 'users/create';
    const userData = {
      token: this.player_id,
      os: 0,
      devicetype: this.device.manufacturer,
      devicemodel: this.device.model
    };
    if (this.device.platform === 'Android') {
      userData.os = 1;
    } else if (this.device.platform === 'iOS') {
      userData.os = 2;
    } else {
      userData.os = 0;
    }
    this.loading.present();
    if (this.noInternetConnection() || !this.player_id) {
      this.loading.close();
      return new Promise(resolve => resolve([]));
    }
    await this.ionicNativeHttp.post(environment.apiUrl + end_point_url +
      `?token=${userData.token}&os=${userData.os}&devicetype=${userData.devicetype}&devicemodel=${userData.devicemodel}`, {},
      { 'shorouknews-api-token': 'shorouknews_6s6sd3@ewd#$Ji$8sd5EAljkW*sw@ddwqq*w002' }).then(data => {
        this.loading.close();
      },
        error => {
          this.loading.close();
          console.log(error);
      });
  }

  async onClickAppVersion() {
    const end_point_url = 'users/announce';
    this.loading.present();
    if (this.noInternetConnection() || !this.player_id) {
      this.loading.close();
      return new Promise(resolve => resolve([]));
    }
    await this.ionicNativeHttp.post(environment.apiUrl + end_point_url +
      `?token=${this.player_id}`, {},
      { 'shorouknews-api-token': 'shorouknews_6s6sd3@ewd#$Ji$8sd5EAljkW*sw@ddwqq*w002' }).then(data => {
        this.loading.close();
      },
        error => {
          this.loading.close();
          console.log(error);
      });
  }

  getAndUpdateTag(): Promise<any> {
    if (this.noInternetConnection()) { return; }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'key=AIzaSyDbheRR45czAh4b9GOSlDoUdADZN2z3PYU'
    });
    const postUrl = 'https://iid.googleapis.com/iid/info/' + this.player_id + '?details=true';
    return new Promise(resolve => {
      this._http.post(postUrl, '', {headers}).subscribe(data => {
        if (data && data['rel'] && data['rel']['topics']) {
          resolve(Object.keys(data['rel']['topics']));
        }
      }, error => {
        console.log('Error=>', error);
      });
    });
  }

  subScribeToAllSections() {
    if (this.noInternetConnection()) { return; }
    const tags = [];
    this.dataService.get('sections', true).then(data => {
      if (data) {
        const casted_sections = <Array<any>>data;
        casted_sections.forEach(element => {
          const section_id = element.ID;
          tags.push(section_id);
        });
        this.sendTags(tags);
      }
    });
  }

  async sendTags(tags: any[]) {
    this.loading.present();
    if (this.noInternetConnection()) {
      this.loading.close();
      return;
    }
    if (!!tags && tags.length > 0) {
      await asyncForEach(tags, async tag => {
        await this.fcm.subscribeToTopic(tag);
      });
      await this.fcm.unsubscribeFromTopic('deactivateAll');
    }
    this.loading.close();
  }

  async deleteTags(tags: any[]) {
    this.loading.present();
    if (this.noInternetConnection()) {
      this.loading.close();
      return;
    }
    if (!!tags && tags.length > 0) {
      await asyncForEach(tags, async tag => {
        await this.fcm.unsubscribeFromTopic(tag);
      });
    }
    this.loading.close();
  }

  sendTag (tag: string) {
    if (this.noInternetConnection()) { return; }
    if (!!tag) {
      this.fcm.subscribeToTopic(tag);
    }
  }

  noInternetConnection() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
      this.alertService.presentAlert('خطأ في الاتصال بالإنترنت', '', '');
      return true;
    }
  }
}

