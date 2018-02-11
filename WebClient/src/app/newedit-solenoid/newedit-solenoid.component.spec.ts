import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeweditSolenoidComponent } from './newedit-solenoid.component';

describe('NeweditSolenoidComponent', () => {
  let component: NeweditSolenoidComponent;
  let fixture: ComponentFixture<NeweditSolenoidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeweditSolenoidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeweditSolenoidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
