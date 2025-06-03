import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AboutPage } from './about.page';
import { ComponentsModule } from '../components/components.module';
import { DfpModule } from 'ngx-dfp';
import { AppVersion } from '@ionic-native/app-version/ngx';

const routes: Routes = [
  {
    path: '',
    component: AboutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    DfpModule.forRoot({
      idleLoad: true,
      singleRequestMode: true, // Only applies to initial refresh
      onSameNavigation: 'refresh',
    })
  ],
  declarations: [AboutPage],
  providers: [
    AppVersion
  ]
})
export class AboutPageModule { }
