import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthorPage } from './author.page';
import { ComponentsModule } from '../components/components.module';
import { DfpModule } from 'ngx-dfp';

const routes: Routes = [
  {
    path: '',
    component: AuthorPage
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
  declarations: [AuthorPage]
})
export class AuthorPageModule { }
