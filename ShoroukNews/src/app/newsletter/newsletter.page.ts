import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { AdsService } from '../../services/ads.service';
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics/ngx";

export enum SubscribingStatus {
  Success = 1,
  MailNotApproved = 2,
  Fail_General = 10,
  Fail_MailExists = 11
}
@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.page.html',
  styleUrls: ['./newsletter.page.scss'],
})
export class NewsletterPage {
  form: FormGroup;
  email_patterns = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private dataService: DataService, public alertService: AlertService,
              private firebaseAnalytics: FirebaseAnalytics, private ads: AdsService) {
    this.form = new FormGroup({
      Email: new FormControl('', Validators.compose([Validators.email, Validators.pattern(this.email_patterns)])),
    });
  }
  ionViewWillEnter(): void {
    setTimeout(() => {
        this.firebaseAnalytics.logEvent('columnist', { param1: 'columnist' })
            .then((res: any) => console.log(res))
            .catch((error: any) => console.error(error));
      this.ads.listToClicksEvents();
    }, 2000);
  }

  addToNewsletter() {
    this.dataService.post(`subscribers/create?email=${this.form.value.Email}`).then(response => {
      if (typeof response === 'string') {
        response = parseInt(response as string);
      }
      const subscribingMsg = this.getSubscribingResultMessage(response);
      this.alertService.presentAlert(subscribingMsg, '', '')
    });
  }
  getSubscribingResultMessage(response): string {
    let message = '';
    switch (response) {
      case SubscribingStatus.Success:
        message = 'شكرا لك، سيصلك بريد إليكتروني للتأكيد';
        break;
      case SubscribingStatus.MailNotApproved:
        message = 'هذا البريد يحتاج إلى التأكيد، برجاء فحص بريدك الإليكتروني الآن للتأكيد';
        break;
      case SubscribingStatus.Fail_General:
        message = 'حدث خطأ، برجاء المحاولة لاحقا';
        break;
      case SubscribingStatus.Fail_MailExists:
        message = 'هذا البريد الإليكتروني مسجل بالفعل';
        break;
      default:
        message = 'حدث خطأ، برجاء المحاولة لاحقا';
        break;
    }
    return message;
  }

}
