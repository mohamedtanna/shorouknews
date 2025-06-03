import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContactPage } from './contact.page';
import { ComponentsModule } from '../components/components.module';
import { DfpModule } from 'ngx-dfp';

const routes: Routes = [
  {
    path: '',
    component: ContactPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    DfpModule.forRoot({
      idleLoad: true,
      singleRequestMode: true, // Only applies to initial refresh
      onSameNavigation: 'refresh',
    })
  ],
  declarations: [ContactPage]
})
export class ContactPageModule { }
