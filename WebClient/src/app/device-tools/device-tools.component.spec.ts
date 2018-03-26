import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceToolsComponent } from './device-tools.component';

describe('DeviceToolsComponent', () => {
  let component: DeviceToolsComponent;
  let fixture: ComponentFixture<DeviceToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
