import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionConfigurationComponent } from './connection-configuration.component';

describe('ConnectionConfigurationComponent', () => {
  let component: ConnectionConfigurationComponent;
  let fixture: ComponentFixture<ConnectionConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
