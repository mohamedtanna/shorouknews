import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from '../services/data.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Network } from '@ionic-native/network/ngx';

import { LoadingService } from '../services/loading.service';
import { AlertService } from '../services/alert.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Observable } from 'rxjs';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { FireMessagingService } from 'src/services/fire-messaging-service';
import { Device } from '@ionic-native/device/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, HttpModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoadingService,
    AlertService,
    DataService,
    SocialSharing,
    HTTP,
    Network,
    NativeStorage,
    WebView,
    AdMobFree,
    FirebaseAnalytics,
    Deeplinks,
    InAppBrowser, YoutubeVideoPlayer,
    FCM,
    FireMessagingService,
    Device,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }

