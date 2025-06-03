import { FireMessagingService } from './../services/fire-messaging-service';
import { Component, NgZone, Renderer2, ElementRef } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from '../services/data.service';
import { NetworkService, ConnectionStatus } from '../services/network.service';
// import { ImageLoaderConfigService } from 'ionic-image-loader';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { NewsDetailsPage } from './news-details/news-details.page';
import { VideoDetailsPage } from './video-details/video-details.page';
import { ColumnPage } from './column/column.page';
import { AdsService } from '../services/ads.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  sections: any;
  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    private firebaseAnalytics: FirebaseAnalytics,
    private statusBar: StatusBar,
    private dataService: DataService,
    private fcmNotification: FireMessagingService,
    private networkService: NetworkService,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router,
    private deeplinks: Deeplinks,
    private ngZone: NgZone,
    private splashScreen: SplashScreen, private ads: AdsService, private renderer: Renderer2
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.runAnalyticsFirbase();
      this.initDeepLinks();
      this.statusBar.styleLightContent();
      this.fcmNotification.initFireMessaging();
      this.loadData();
      this.exitApp();
      this.ads.renderer = this.renderer;
      setTimeout(() => {
        this.splashScreen.hide();
      }, 5000);
    });
  }

  loadData() {
    this.dataService.get('sections', true).then(data => {
      // const data_obj = <Object>data;
      this.sections = data;
    });
  }
  exitApp() {
    if (this.platform.is('desktop')) {
      return;
    }
    this.platform.backButton.subscribe(() => {
      if (this.router.url === '/home') {
        navigator['app'].exitApp();
      }
    });
  }

  initDeepLinks() {
    if (this.platform.is('desktop')) {
      return;
    }
    this.deeplinks.route({
      '/news-details/:cdate/:id': NewsDetailsPage,
      '/video-details/:videoId': VideoDetailsPage,
      '/column-details/:cdate/:column_id': ColumnPage
    }).subscribe((match) => {
      console.log('Successfully matched route', match);
      // alert('Successfully matched route' + match);
      this.ngZone.run(() => this.router.navigateByUrl(match.$link.path));
    },
      (nomatch) => {
        console.error('Got a deeplink that didn\'t match', nomatch);
        // alert('Got a deeplink that didn\'t match' + nomatch);
      });
  }
  runAnalyticsFirbase() {
    if (this.platform.is('desktop')) {
      return;
    }
    this.firebaseAnalytics.setEnabled(true);
    // .then(response => console.log('analytics collection is enabled for shourouk news on this device.', response))
    // .catch(err => console.log('enable analytics collection failed ', err));

    this.route.url.subscribe(url => {
      // console.log(url[0].path);
      this.firebaseAnalytics.setCurrentScreen(url[0].path);
    });

    this.firebaseAnalytics.logEvent('page_view', { param1: 'home' })
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
  }
}







