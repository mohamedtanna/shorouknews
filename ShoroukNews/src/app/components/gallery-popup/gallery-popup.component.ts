import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-gallery-popup',
  templateUrl: './gallery-popup.component.html',
  styleUrls: ['./gallery-popup.component.scss']
})
export class GalleryPopupComponent {
  relatedPhotos = {};
  constructor(public modalcontroller: ModalController, public navParams: NavParams) {
    this.relatedPhotos = this.navParams.data.photos;
  }



  slideOpts = {
    effect: 'flip',
    loop: 'true',
    margin:2
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
  };


  dismiss() {
    this.modalcontroller.dismiss();
  }

}
