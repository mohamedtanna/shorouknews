import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AdsService } from '../../services/ads.service';
import { Content, Refresher } from '@ionic/angular';

@Component({
  selector: 'app-list-of-news',
  templateUrl: './list-of-news.page.html',
  styleUrls: ['./list-of-news.page.scss'],
})
export class ListOfNewsPage implements OnInit {

  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;
  news: any[];
  sectionId: object;
  sectionName = '';
  url: string;
  currentPage = 1;
  data: any;
  constructor(private dataService: DataService, private route: ActivatedRoute, private ads: AdsService, private router: Router) {
    this.news = [];
    this.route.params.subscribe(
      params => {
        this.sectionId = params.id;
        this.sectionName = params.sectionName;
        if (params.id === 'null') {
          this.url = 'news?currentpage=';
        } else {
          this.url = `sections/${this.sectionId}/news?currentpage=`;
        }
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
      this.ads.listToClicksEvents();
    }, 2000);
  }
  ionViewWillEnter() {
    this.content.scrollToTop();
    this.news = [];
    this.currentPage = 1;
    this.loadData();
  }

  loadData(refresher?) {
    this.getData(refresher);
  }
  loadMoreData(event) {
    this.currentPage++;
    this.getData(event);
  }
  getData(event) {
    this.dataService.get(this.url + this.currentPage, false).then(response => {

      this.data = response;
      if (this.data) {
        this.data.forEach(element => {
          this.news.push(element);
        });
      }
      if (event && event.target) {
        event.target.complete();
      }
    });
  }
}
