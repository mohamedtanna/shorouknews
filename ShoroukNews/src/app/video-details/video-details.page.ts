import { Component, AfterViewInit, ViewChild, OnInit, NgZone, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DataService } from '../../services/data.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AdsService } from '../../services/ads.service';
import { Content, Events, Refresher } from '@ionic/angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics/ngx";


@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.page.html',
  styleUrls: ['./video-details.page.scss'],
})
export class VideoDetailsPage {
  videos: {};
  videoId: string;
  videoImage = '';
  trustedVideoUrl: SafeResourceUrl;
  youtube_url = 'https://www.youtube.com/embed/';
  video: {};
  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private socialSharing: SocialSharing,
    private domSanitizer: DomSanitizer,
    private firebaseAnalytics: FirebaseAnalytics,
    private ads: AdsService, private router: Router,
    private youtube: YoutubeVideoPlayer) {
    route.params.subscribe(params => {
      this.videoId = params.videoId;
      this.videoImage = `https://img.youtube.com/vi/${this.videoId}/hqdefault.jpg`;
    });
  }
  ionViewWillEnter(): void {

      this.firebaseAnalytics.logEvent('video_inner', { param1: 'video_inner' })
          .then((res: any) => console.log(res))
          .catch((error: any) => console.error(error));
    this.loadData();
  }
  loadData(refresher?) {
    this.dataService.get(`videos/${this.videoId}`, false).then(data => {
      this.video = data;
      console.log(data);
    });
    this.dataService.get('videos?pagesize=6', false).then(data => {
      this.videos = data;
    });
  }
  shareVideo(title: string, message: string, url: string, file: string) {
    this.socialSharing.share(message, title, file, url);
  }

  openVideo() {
    this.youtube.openVideo(this.videoId);
  }

}
