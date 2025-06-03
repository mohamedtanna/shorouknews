import { Component, OnInit, Renderer2, ViewChild, Inject, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { from, Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Platform, Refresher, Content } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { DOCUMENT } from '@angular/common';
import { AdsService } from '../../services/ads.service';
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics/ngx";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mainStories: object;
  firstMainStory: object;
  topStories: object;
  mostreadStories: object;
  selectedColumns: object;
  lastestNews: object = [];
  importantNews = 'أهم الأخبار';
  putInCache = true;
  page_size = 6;

  @ViewChild(Refresher) refresher: Refresher;
  @ViewChild(Content) content: Content;
  constructor(private dataService: DataService, private router: Router, private ads: AdsService,
              private firebaseAnalytics: FirebaseAnalytics) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.firebaseAnalytics.logEvent('Home', { param1: 'home' })
          .then((res: any) => console.log(res))
          .catch((error: any) => console.error(error));
      this.ads.listToClicksEvents();
    }, 5000);
  }
  ionViewWillEnter(): void {
    this.content.scrollToTop();
    this.loadData();
    this.ads.initAdMob('AdMobBanner1');
    this.ads.reloadSpeakol();
  }  
  ionViewWillLeave() {
    this.ads.removeBanner();
  }
  loadData(refresher?) {
    this.dataService.get('news/collections/mainstories', this.putInCache)
      .then(data => {
        this.mainStories = data;
        this.firstMainStory = data[0];
        if (refresher) {
          refresher.target.complete();
        }
      });
    this.dataService.get(`news/mostread`, this.putInCache)
      .then(data => {
        this.mostreadStories = data;
        if (refresher) {
          refresher.target.complete();
        }
      });
    this.dataService.get('columns/collections/selected', this.putInCache)
      .then(data => {
        this.selectedColumns = data;
        if (refresher) {
          refresher.target.complete();
        }
      });

    this.dataService.get('news/collections/topstories', this.putInCache)
      .then(data => {
        this.topStories = data;
        if (refresher) {
          refresher.target.complete();
        }
      });
  }

  refreshPage(data) {
    if (data) {
      this.loadData(this.refresher);
      this.ads.reloadSpeakol();
      this.content.scrollToTop();
    }
  }


}




