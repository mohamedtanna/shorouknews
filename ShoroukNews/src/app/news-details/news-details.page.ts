import { Component, OnInit, AfterViewInit, NgZone, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DataService } from '../../services/data.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ModalController, Events, Content, Refresher } from '@ionic/angular';
import { GalleryPopupComponent } from '../components/gallery-popup/gallery-popup.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AdsService } from '../../services/ads.service';
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics/ngx";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
})
export class NewsDetailsPage implements OnInit {
  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;

  sectionId: string;
  more_news: {};
  newsDetails: any;
  newsId: string;
  cdate: string;
  sectionName: string;
  fontsize = 16;
  minimumuFontSize = 12;
  maxFontSize = 40;
  page_size = 6;
  backUrl = '';
  slideOpts = {
    effect: 'flip',
    slidesPerView: 2.5,
    margin: 2
  };
  constructor(private dataService: DataService, private sanitized: DomSanitizer,
    private route: ActivatedRoute, public events: Events, private el: ElementRef,
              private firebaseAnalytics: FirebaseAnalytics,
    private socialSharing: SocialSharing, private router: Router,
    public modalController: ModalController, private ads: AdsService) {
    route.params.subscribe(
      params => {
        this.newsId = params.id;
        this.cdate = params.cdate;
      }
    );
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
      this.firebaseAnalytics.logEvent('news_inner', { param1: 'news_inner' })
          .then((res: any) => console.log(res))
          .catch((error: any) => console.error(error));
      this.ads.listToClicksEvents();
    }, 2000);
  }
  ionViewWillEnter() {
    this.content.scrollToTop();
    this.loadData();
    this.ads.initAdMob('AdMobBanner2');
    this.ads.reloadSpeakol();
  }
  ionViewWillLeave() {
    this.ads.removeBanner();
  }
  loadtwitter() {
      let id = "twitter-wjs";
      let js: any, fjs = document.getElementsByTagName("script")[0];
      js = document.createElement("script");
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
  }
  loadinstagram() {
      let id="instagram-wjs";
      let js: any, fjs=document.getElementsByTagName("script")[0];
      js = document.createElement("script");
      js.id = id;
      js.setAttribute("onLoad","window.instgrm.Embeds.process()");
      js.src = "https://platform.instagram.com/en_US/embeds.js";
      fjs.parentNode.insertBefore(js, fjs);
  }
  loadData(refresher?) {
    this.dataService.get('news/' + this.cdate + '/' + this.newsId, false)
      .then(data => {
        console.log(data);

        this.newsDetails = data;
        this.loadtwitter();
        this.loadinstagram();
        this.backUrl = `/list-of-news/${this.newsDetails.SectionID}/${this.newsDetails.SectionAr_Name}`;
        this.dataService.get(`sections/${this.newsDetails.SectionID}/news?pagesize=${this.page_size}`, false).then(res => {
          this.more_news = res;
          if (refresher && refresher.target) {
            refresher.target.complete();
          }
        });

      });
  }
  regularShare(title: string, message: string, url: string, file: string) {
    this.socialSharing.share(message, title, file, url).then(response => {
    });
  }
  increaseFont() {
    if (this.fontsize < this.maxFontSize) {
      this.fontsize += 1;
    }
  }
  decreaseFont() {
    if (this.fontsize > this.minimumuFontSize) {
      this.fontsize -= 1;
    }
  }
  // ======================================
  async presentModal(url: string = null) {
    let photos = this.newsDetails.RelatedPhotos;
    if (!!url) {
      photos = [{PhotoUrl: url}];
    }
    const modal = await this.modalController.create({
      component: GalleryPopupComponent,
      componentProps: { photos }
    });
    await modal.present();
  }
  trunacteString(length: number, value: string) {
    const truncatedString = value.substring(0, length);
    return truncatedString + '...';
  }
  getInnerHTMLValue(v) {
    return this.sanitized.bypassSecurityTrustHtml(v);
  }
}

