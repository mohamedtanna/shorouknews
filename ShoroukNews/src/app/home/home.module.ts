import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
// import { AdsenseModule } from 'ng2-adsense';
import { ComponentsModule } from '../components/components.module';
import { DfpModule } from 'ngx-dfp';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DfpModule.forRoot({
      // idleLoad: true,
      // singleRequestMode: true, // Only applies to initial refresh
      // onSameNavigation: 'refresh',
    }),
    // IonicImageLoader.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
