import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItiDetailsComponent } from './iti-details.component';

describe('ItiDetailsComponent', () => {
  let component: ItiDetailsComponent;
  let fixture: ComponentFixture<ItiDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItiDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
