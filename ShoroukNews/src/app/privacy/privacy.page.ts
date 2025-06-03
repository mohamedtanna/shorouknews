import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage {
  constructor(private ads: AdsService, private renderer: Renderer2) {
  }
  ionViewWillEnter(): void {
    setTimeout(() => {
      this.ads.listToClicksEvents();
    }, 2000);
  }
}
