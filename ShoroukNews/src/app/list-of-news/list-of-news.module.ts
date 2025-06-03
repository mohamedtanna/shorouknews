import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { ListOfNewsPage } from './list-of-news.page';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { DfpModule } from 'ngx-dfp';

const routes: Routes = [
  {
    path: '',
    component: ListOfNewsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes),
    ComponentsModule
    , DfpModule.forRoot({
      idleLoad: true,
      singleRequestMode: true, // Only applies to initial refresh
      onSameNavigation: 'refresh',
    })],
  declarations: [ListOfNewsPage]
})
export class ListOfNewsPageModule { }
