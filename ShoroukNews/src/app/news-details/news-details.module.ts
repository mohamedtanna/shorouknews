import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NewsDetailsPage } from './news-details.page';

import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { DfpModule } from 'ngx-dfp';

const routes: Routes = [
  {
    path: '',
    component: NewsDetailsPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    ComponentsModule
    , DfpModule.forRoot({
      idleLoad: true,
      singleRequestMode: true,
      onSameNavigation: 'refresh'
    })
  ],
  declarations: [NewsDetailsPage],
  entryComponents: []
})
export class NewsDetailsPageModule { }
