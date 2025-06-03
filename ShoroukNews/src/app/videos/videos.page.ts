import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AdsService } from '../../services/ads.service';
import { Router, NavigationEnd } from '@angular/router';
import { Content, Refresher } from '@ionic/angular';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  putheaders = true;
  putInCache = false;
  data: Array<object>;
  nextpagetoken = '';
  videos: Array<object>;
  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;

  constructor(private dataService: DataService, private ads: AdsService, private router: Router) {
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
      this.ads.listToClicksEvents();
    }, 2000);
  }
  ionViewWillEnter() {
    this.videos = new Array<object>();
    this.content.scrollToTop();
    this.loadData();
  }
  loadData(refresher?) {
    this.getData(refresher);
  }
  loadMoreData(event) {
    this.nextpagetoken = this.dataService.getHeaders();
    console.log(this.nextpagetoken);
    if (this.nextpagetoken) {
      this.getData(event);
    } else {
      event.target.complete();
    }
  }
  getData(event) {
    this.dataService.get(`videos?nextpagetoken=${this.nextpagetoken}`, this.putInCache, this.putheaders).then((response: any) => {
      this.data = response as Array<object>;
      if (this.data) {
        this.data.forEach(element => {
          this.videos.push(element);
        });
      }
      if (event) {
        event.target.complete();
      }
    });
  }
}
