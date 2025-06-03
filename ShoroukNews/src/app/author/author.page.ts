import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AdsService } from '../../services/ads.service';


@Component({
  selector: 'app-author',
  templateUrl: './author.page.html',
  styleUrls: ['./author.page.scss'],
})
export class AuthorPage {

  columnist_id: string;
  columnist: object;
  columns: any[];
  columnistPhoto = '';
  currentPage = 1;
  data: any;
  constructor(private dataService: DataService, private route: ActivatedRoute, private ads: AdsService) {
    // this.columns = [];
    route.params.subscribe(
      params => {
        this.columnist_id = params.columnist_id;
      }
    );
  }
  ionViewWillEnter() {
    this.columns = [];
    setTimeout(() => {
      this.ads.listToClicksEvents();
    }, 2000);
    this.loadData();
  }
  loadData(refresher?) {
    this.dataService.get('columnists/' + this.columnist_id, false)
      .then(data => {
        this.columnist = data;
        if (refresher) {
          refresher.target.complete();
        }
      });
    this.getColumns(refresher);
  }

  LoadMoreColumns(event) {
    this.currentPage++;
    this.getColumns(event);
  }

  getColumns(event) {

    this.dataService.get(`columnists/${this.columnist_id}/columns?currentpage=${this.currentPage}`, false, false)
      .then(response => {
        this.data = response;
        this.data.forEach(element => {
          this.columns.push(element);
        });
        this.columnistPhoto = this.columns[0].ColumnistPhotoUrl;
        if (event) {
          event.target.complete();
        }
      });
  }
}
