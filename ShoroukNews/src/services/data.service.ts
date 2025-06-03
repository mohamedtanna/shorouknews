import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform, AlertController, ToastController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { LoadingService } from './loading.service';
import { AlertService } from './alert.service';
import { NetworkService, ConnectionStatus } from './network.service';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  response: object;
  isLoading = false;
  headers = '';

  constructor(private httpClient: HttpClient,
    private ionicNativeHttp: HTTP,
    private platform: Platform,
    private network: Network,
    private toastController: ToastController,
    private storage: Storage,
    private loading: LoadingService,
    private networkService: NetworkService,
    private alertService: AlertService) {
  }
  get(end_point_url: string, putInCache: boolean, putHeaders = false) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
      const toast = this.toastController.create({
        message: `خطأ في الاتصال بالإنترنت`,
        duration: 3000,
        position: 'bottom'
      });
      toast.then(t => t.present());
      return this.getLocalData(end_point_url);
    } else {
      this.loading.present();
      if (this.platform.is('desktop')) {
        const httpOptions = {
          headers: new HttpHeaders({ 'shorouknews-api-token': 'shorouknews_6s6sd3@ewd#$Ji$8sd5EAljkW*sw@ddwqq*w002' }),
          observe: 'response' as 'response'
        };
        return new Promise(resolve => {
          this.httpClient.get(environment.apiUrl + end_point_url, httpOptions).subscribe(
            (data: HttpResponse<any>) => {
              if (putInCache) {
                this.setLocalData(end_point_url, data.body);
              }
              this.loading.close();
              resolve(data.body);
              if (putHeaders) {
                const h = data.headers.get('NextPageToken');
                this.setHeaders(h);
              }
            },
            error => {
              console.log('ERROR :', error);
              this.alertService.presentAlert(error.message, 'Error', '');
              this.loading.close();
            });
        });
      } else {
        return new Promise(resolve => {
          this.ionicNativeHttp.get(environment.apiUrl + end_point_url, {},
            { 'shorouknews-api-token': 'shorouknews_6s6sd3@ewd#$Ji$8sd5EAljkW*sw@ddwqq*w002' }).
            then(data => {
              this.response = JSON.parse(data.data);
              if (putInCache) {
                this.setLocalData(end_point_url, data.data);
              }
              if (putHeaders) {
                const h = data.headers['nextpagetoken'];
                this.setHeaders(h);
              }
              this.loading.close();
              resolve(this.response);
            }).catch(error => {
              console.log(error);
              console.log(error.status);
              console.log(error.error); // error message as string
              console.log(error.headers);
              // if (error.error) {
              //   this.alertService.presentAlert('خطأ في استعادة البيانات', '', '');
              // }
              this.loading.close();
            });
        });
      }
    }
  }
  // ****************************************************POST************************************************************** */
  post(end_point_url) {
    this.loading.present();
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
      this.loading.close();
      const toast = this.toastController.create({
        message: `خطأ في الاتصال بالإنترنت`,
        duration: 3000,
        position: 'bottom'
      });
      toast.then(t => t.present());
      return;
    } else {
      if (this.platform.is('desktop')) {
        const headers = new HttpHeaders({ 'shorouknews-api-token': 'shorouknews_6s6sd3@ewd#$Ji$8sd5EAljkW*sw@ddwqq*w002' });
        return new Promise(resolve => {
          this.httpClient.post(environment.apiUrl + end_point_url, '', { headers }).subscribe(data => {
            this.loading.close();
            resolve(data);
          },
            error => {
              this.loading.close();
              this.alertService.isLoading = false;
              this.alertService.presentAlert(error.message, 'Error', '');
              console.log(error);
            });
        });
      } else {
        return new Promise(resolve => {
          this.ionicNativeHttp.post(environment.apiUrl + end_point_url, {},
            { 'shorouknews-api-token': 'shorouknews_6s6sd3@ewd#$Ji$8sd5EAljkW*sw@ddwqq*w002' }).then(data => {
              this.loading.close();
              resolve(data.data);
            },
              error => {
                this.loading.close();
                this.alertService.isLoading = false;
                this.alertService.presentAlert(error.message, 'Error', '');
                console.log(error);
              });
        });
      }
    }
  }
  // *********************************************************************************************************************** */
  // Save result of API requests
  private setLocalData(key, data) {
    this.storage.set(`${key}`, data);
  }
  // Get cached API result
  private getLocalData(key) {
    return new Promise(resolve => {
      this.storage.get(key).then(data => {
        resolve(JSON.parse(data));
      });
    });
  }
  setHeaders(responseHeaders) {
    if (responseHeaders) {
      this.headers = responseHeaders;
    }
  }
  getHeaders() {
    return this.headers;
  }
}
