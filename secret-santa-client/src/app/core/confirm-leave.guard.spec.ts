import { TestBed } from '@angular/core/testing';

import { ConfirmLeaveGuard } from './confirm-leave.guard';

describe('ConfirmLeaveGuard', () => {
  let guard: ConfirmLeaveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfirmLeaveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
