import { TestBed, inject } from '@angular/core/testing';

import { ConnectionManagerService } from './connection-manager.service';

describe('ConnectionManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectionManagerService]
    });
  });

  it('should be created', inject([ConnectionManagerService], (service: ConnectionManagerService) => {
    expect(service).toBeTruthy();
  }));
});
