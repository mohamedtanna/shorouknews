import { Component, OnInit, Input, AfterViewInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {


  showBackButton: boolean;

  @Input() BackUrl = '/';
  @Output() change = new EventEmitter();

  constructor(private router: Router) {
    if (router.url === '/home') {
      this.showBackButton = false;
    } else {
      this.showBackButton = true;
    }
  }

  refresh() {
    if (this.router.url === '/home') {
      this.change.emit('true');
    } else {
      this.router.navigateByUrl('/');
    }

  }


  // ngAfterViewInit(): void {
  //   // if (this.BackUrl === undefined) {
  //   //   this.test = '/home';
  //   //   this.BackUrl = '/';
  //   // }
  //   // // else {
  //   // //   this.test = this.BackUrl;
  //   // // }

  // }
}
