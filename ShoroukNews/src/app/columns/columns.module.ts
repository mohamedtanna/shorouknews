import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

import { IonicModule } from '@ionic/angular';

import { ColumnsPage } from './columns.page';
import { DfpModule } from 'ngx-dfp';

const routes: Routes = [
  {
    path: '',
    component: ColumnsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
    , DfpModule.forRoot({
      idleLoad: true,
      singleRequestMode: true, // Only applies to initial refresh
      onSameNavigation: 'refresh',
    })
  ],
  declarations: [ColumnsPage]
})
export class ColumnsPageModule { }
