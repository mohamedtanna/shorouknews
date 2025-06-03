import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {

  constructor(private ads: AdsService) { }

  ionViewWillEnter(): void {
    setTimeout(() => {
      this.ads.listToClicksEvents();
    }, 2000);
  }

}
