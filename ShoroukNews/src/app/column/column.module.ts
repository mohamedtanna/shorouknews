import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';

import { IonicModule } from '@ionic/angular';

import { ColumnPage } from './column.page';
import { DfpModule } from 'ngx-dfp';

const routes: Routes = [
  {
    path: '',
    component: ColumnPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes), PipesModule,
    ComponentsModule
    , DfpModule.forRoot({
      idleLoad: true,
      singleRequestMode: true, // Only applies to initial refresh
      onSameNavigation: 'refresh',
    })
  ],
  declarations: [ColumnPage]
})
export class ColumnPageModule { }
