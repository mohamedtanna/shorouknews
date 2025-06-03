import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage {
  @ViewChild('Ads') adsContainer: ElementRef;

  constructor(private ads: AdsService) {
  }
  ionViewWillEnter(): void {
    setTimeout(() => {
      this.ads.listToClicksEvents();
    }, 2000);
  }
 
}
