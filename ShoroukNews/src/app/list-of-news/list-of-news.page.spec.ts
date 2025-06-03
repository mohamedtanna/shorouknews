import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfNewsPage } from './list-of-news.page';

describe('ListOfNewsPage', () => {
  let component: ListOfNewsPage;
  let fixture: ComponentFixture<ListOfNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfNewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
