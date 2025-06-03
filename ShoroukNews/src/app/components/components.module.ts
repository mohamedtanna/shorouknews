import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { GalleryPopupComponent } from './gallery-popup/gallery-popup.component';
import { IonicModule } from '@ionic/angular';
import { AdsComponent } from './ads/ads.component';

@NgModule({
  declarations: [HeaderComponent, GalleryPopupComponent, AdsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderComponent, GalleryPopupComponent, AdsComponent],
  entryComponents: [GalleryPopupComponent]
})
export class ComponentsModule { }
