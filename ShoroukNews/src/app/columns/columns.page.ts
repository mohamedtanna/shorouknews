import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AdsService } from '../../services/ads.service';
import { Content, Refresher } from '@ionic/angular';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.page.html',
  styleUrls: ['./columns.page.scss'],
})
export class ColumnsPage implements OnInit {


  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;
  columnist_id: string;
  columnist: object;
  columns: any[];
  columnistPhoto = '';
  currentPage = 1;
  data: any;
  url: string;
  constructor(private dataService: DataService, private route: ActivatedRoute, private ads: AdsService, private router: Router) {
    route.params.subscribe(
      params => {
        if (params.columnist_id === 'null') {
          this.url = `columns?currentpage=`;
        } else {
          this.columnist_id = params.columnist_id;
          this.url = `columnists/${this.columnist_id}/columns?currentpage=`;
        }
      }
    );
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.ads.listToClicksEvents();
    }, 2000);
  }
  ionViewWillEnter(): void {
    this.currentPage = 1;
    this.columns = [];
    this.content.scrollToTop();
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
    this.dataService.get(this.url + `${this.currentPage}`, false)
      .then(response => {
        this.data = response;
        this.data.forEach(element => {
          this.columns.push(element);
        });
        this.columnistPhoto = this.columns[0].ColumnistPhotoUrl;
        if (event && event.target) {
          event.target.complete();
        }
      });
  }

}
