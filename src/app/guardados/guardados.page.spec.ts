import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardadosPage } from './guardados.page';

describe('GuardadosPage', () => {
  let component: GuardadosPage;
  let fixture: ComponentFixture<GuardadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
