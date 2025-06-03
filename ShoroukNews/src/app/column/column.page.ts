import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataService } from '../../services/data.service';
import { AdsService } from '../../services/ads.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Content, Refresher } from '@ionic/angular';
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics/ngx";

@Component({
  selector: 'app-column',
  templateUrl: './column.page.html',
  styleUrls: ['./column.page.scss'],
})
export class ColumnPage implements OnInit {
  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;
  column_details: any;
  columns: object;
  column_id: string;
  cdate: string;
  columnist_id: string;
  page_size = 6;
  fontsize = 16;
  minimumuFontSize = 12;
  maxFontSize = 40;
  _link: string;
  constructor(private dataService: DataService, private route: ActivatedRoute,
    private socialSharing: SocialSharing, private el: ElementRef,
              private firebaseAnalytics: FirebaseAnalytics,
    private ads: AdsService, private router: Router) {
    this.route.params.subscribe(
      params => {
        this.column_id = params.column_id;
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
        // if you need to scroll back to top, here is the right place
      }
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
        this.firebaseAnalytics.logEvent('column_inner', { param1: 'column_inner' })
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
  loadData(refresher?) {
    this.dataService.get('columns/' + this.cdate + '/' + this.column_id, false)
      .then(data => {
        this.column_details = data;
        this.setColumns(this.column_details.ColumnistID);
        if (refresher && refresher.target) {
          refresher.target.complete();
        }
      });
  }
  shareArticle(title: string, message: string, url: string, file: string) {
    this.socialSharing.share(message, title, file, url);
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

  trunacteString(length: number, value: string) {
    const truncatedString = value.substring(0, length);
    return truncatedString + '...';
  }
  setColumns(columnist_id) {
    this.dataService.get(`columnists/${columnist_id}/columns?pagesize=${this.page_size}`, false)
      .then(data => {
        this.columns = data;
      });
  }

  // // ======================================================================
  // enableDynamicHyperlinks(): void {
  //   // Provide a minor delay to allow the HTML to be rendered and 'found'
  //   // within the view template
  //   setTimeout(() => {
  //     const urls: any = this.el.nativeElement.querySelectorAll('a');
  //     urls.forEach((url) => {
  //       url.addEventListener('click', (event) => {
  //         event.preventDefault();
  //         const link = event.target.href;
  //         this.launchInAppBrowser(link);
  //       }, false);
  //     });
  //   }, 2000);
  // }
  // launchInAppBrowser(link: string): void {
  //   navigator['app'].loadUrl(link, {
  //     openExternal: true
  //   });
  // }

}
