import { using } from 'rxjs';
import { Component, Inject, ElementRef, Renderer2, AfterViewChecked, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@ionic/angular';
import { AdsService } from '../../services/ads.service';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TestPageModule } from './test.module';


@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})

export class TestPage implements OnDestroy, OnInit {
  navigationSubscription;
  private _link: string;

  public snippet = `<h1>Top 5 tech companies</h1>
  <ul>
     <li>
        <a href="http://www.apple.com">Apple</a>
     </li>
     <li>
        <a href="http://www.facebook.com">Facebook</a>
     </li>
     <li>
        <a href="http://www.google.com">Google</a>
     </li>
     <li>
        <a href="http://www.microsoft.com">Microsoft</a>
     </li>
     <li>
        <a href="http://www.twitter.com">Twitter</a>
     </li>
  </ul>`;
  constructor(private router: Router, private _browser: InAppBrowser,
    private _element: ElementRef) {

    this.router.navigateByUrl('/test', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/test']));


    // subscribe to the router events - storing the subscription so
    // we can unsubscribe later.
    // console.log(this.router.events);
    // this.navigationSubscription = this.router.events.subscribe((e: any) => {
    //   // If it is a NavigationEnd event re-initalise the component
    //   if (e instanceof NavigationEnd) {
    //     this.initialiseInvites();
    //   }
    // });
  }

  // initialiseInvites() {
  //   // Set default values and re-fetch any data you need.
  //   console.log('reload data agian');
  // }


  public ngOnInit(): void {
    console.log('ngOnInit');
    // enableDynamicHyperlinks(this._element);
  }


  ngOnDestroy() {
    // // avoid memory leaks here by cleaning up after ourselves. If we
    // // don't then we will continue to run our initialiseInvites()
    // // method on every navigationEnd event
    // if (this.navigationSubscription) {
    //   this.navigationSubscription.unsubscribe();
    // }
  }


}

