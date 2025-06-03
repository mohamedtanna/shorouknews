import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoadingService } from '../../services/loading.service';
import { ToastController } from '@ionic/angular';
import { AdsService } from '../../services/ads.service';
import { FireMessagingService } from 'src/services/fire-messaging-service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, AfterViewInit {
  sections: any;
  tags: string[];
  toDelete: string[];
  allClicked = false;
  unsubscribing = false;
  constructor(private dataService: DataService,
              private fcmNotification: FireMessagingService,
              private toastController: ToastController,
              private ads: AdsService) {
    console.log('testing settings');
  }
  ngOnInit() {
    if (this.toDelete === undefined) {
      this.toDelete = [];
    }
    this.fcmNotification.getAndUpdateTag().then(
      response => {
        this.tags = response;
      });
  }
  ngAfterViewInit(): void {

  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.ads.listToClicksEvents();
    }, 2000);
    this.loadData();
  }

  // ==============================================================================================================
  loadData(refresher?) {
    this.dataService.get('sections', false).then(data => {
      // const data_obj = <Object>data;
      this.sections = data;
      if (refresher) {
        refresher.target.complete();
      }
      if (!this.tags || this.tags.length <= 0) {
        this.tags = [];
      }
    }).catch(error => {
    });
  }
  // ==============================================================================================================
  change(event, section) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.addTag(section);
    } else {
      this.removeTag(section);
    }
  }
  // ==============================================================================================================
  addTag(section) {
    if (section) {
      if (!this.tags.includes(section.ID)) {
        this.tags.push(section.ID);
      }
    }
  }
  // ==============================================================================================================
  removeTag(section) {
    if (section) {
      const tagIndex = this.tags.indexOf(section.ID);
      if (tagIndex >= 0) {
        this.tags.splice(tagIndex, 1);
        this.toDelete.push(section.ID);
      }
    }
  }
  // ==============================================================================================================
  async saveSettings() {
    if (this.toDelete.length > 0) {
      await this.fcmNotification.deleteTags(this.toDelete);
      this.toDelete = [];
    }
    if (this.tags.length > 0) {
      await this.fcmNotification.sendTags(this.tags);
    } else {
      this.fcmNotification.sendTag('deactivateAll');
    }
    const toast = this.toastController.create({
      message: `تم الحفظ `,
      duration: 3000,
      position: 'bottom',
    });
    toast.then(t => t.present());
  }
  // ==============================================================================================================
  isToggleChecked(section: any) {
    const section_id = section.ID;
    if (this.tags.includes(section_id)) {
      return true;
    } else {
      return false;
    }
  }
  // ==============================================================================================================
  activateAll() {
    // this.unsubscribing = false;
    const casted_sections = <Array<any>>this.sections;
    casted_sections.forEach(element => {
      const section_id = element.ID;
      if (!this.tags.includes(section_id)) {
        this.tags.push(section_id);
      }
    });
  }
  // ==============================================================================================================
  deActivateAll() {
    if (!!this.tags && this.tags.length > 0) {
      this.toDelete = this.tags;
      this.tags = [];
    }
  }
  // ==============================================================================================================
}
