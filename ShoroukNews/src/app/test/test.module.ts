import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TestPage } from './test.page';
import { ComponentsModule } from '../components/components.module';
import { DfpModule } from 'ngx-dfp';
import { PipesModule } from '../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: TestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PipesModule,
    DfpModule.forRoot({
      // idleLoad: true,
      // singleRequestMode: true, // Only applies to initial refresh
      // onSameNavigation: 'refresh',
    }),
  ],
  declarations: [TestPage]
})
export class TestPageModule {}
