import { Injectable, Renderer2, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@ionic/angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { environment } from 'src/environments/environment';
import 'src/assets/js/speakol.js';

declare var myExtObject: any;
@Injectable({
  providedIn: 'root'
})
export class AdsService {
  renderer: Renderer2;
  ad_units = {
    ios: {
      'AdMobBanner1': 'ca-app-pub-7072246965452303/6128075601',
      'AdMobBanner2': 'ca-app-pub-7072246965452303/5720881497',
    },
    android: {
      'AdMobBanner1': 'ca-app-pub-7072246965452303/2539473944',
      'AdMobBanner2': 'ca-app-pub-7072246965452303/8921759909',
    }
  };
  constructor(@Inject(DOCUMENT) document, private pltform: Platform, private admobFree: AdMobFree) {
  }


  getFramesCount(): number {
    const adsFrames = document.querySelectorAll('iframe');
    const frames = Array.from(adsFrames);
    return frames.length;
  }

  listToClicksEvents() {
    if (this.pltform.is('ios')) {
      return;
    }
    const adsFrames = document.querySelectorAll('iframe');
    const frames = Array.from(adsFrames);
    if (frames.length < 0) { return; }
    frames.forEach(i => {
      this.detectLink(i);
    });
  }
  private detectLink(el: any) {
    const frame = el as HTMLIFrameElement;
    if (frame === null) { return; }
    if (frame.contentDocument) {
      const anchors = Array.from(frame.contentDocument.getElementsByTagName('a'));
      if (anchors.length) {
        anchors.forEach(anchor => {
          const originalUrl = anchor.getAttribute('href');
          this.openExternalLink(anchor);
        });
      }
    }
  }
  private openExternalLink(i: HTMLAnchorElement) {
    this.renderer.listen(i, 'click', (event) => {
      console.log('ssss')
      const url = i.getAttribute('href');
      event.preventDefault();
      if (this.pltform.is('desktop')) { console.log('iam desktop'); return; }
      navigator['app'].loadUrl(url, {
        openExternal: true
      });
    });
  }
  // ----------------------------------------------AdMob-----------------------------------------
  initAdMob(adKey) {
    let bannerConfig: AdMobFreeBannerConfig;
    if (this.pltform.is('android')) {
      bannerConfig = {
        isTesting: environment.adMobTestingFlag,
        autoShow: true,
        id: this.ad_units.android[adKey]
      };
    }
    if (this.pltform.is('ios')) {
      bannerConfig = {
        isTesting: false, // environment.adMobTestingFlag,
        autoShow: true,
        id: this.ad_units.ios[adKey]
      };
    }
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare()
      .then(() => {
        console.log('admob should appears');
      })
      .catch(e => console.log(e));
  }
  removeBanner() {
    this.admobFree.banner.remove();
  }

  reloadSpeakol() {
    // if(!!speakolElement) {
    //   console.log('speakolElement ==> ', JSON.stringify(speakolElement.nativeElement))
    //   myExtObject.func3(speakolElement.nativeElement, "script", "wi-2410", "spk-wi-2411");
    // }    
    // return new Promise((resolve)=>{
    //   const dynamicScripts = ['src/assets/js/speakol.js'];  
    //   for (let i = 0; i < dynamicScripts .length; i++) {
    //       const node = document.createElement('script');
    //       node.src = dynamicScripts [i];
    //       node.type = 'text/javascript';
    //       node.async = false;
    //       node.charset = 'utf-8';
    //       document.getElementsByTagName('head')[0].appendChild(node);
    //   }
    //   resolve(true);
    // })
  }
}
