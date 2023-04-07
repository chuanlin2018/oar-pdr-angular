import { TestBed } from '@angular/core/testing';

import { MyAwesomeLibWithJestService } from './my-awesome-lib-with-jest.service';
import 'zone.js';
import 'zone.js/dist/long-stack-trace-zone.js';
import 'zone.js/testing';

describe('MyAwesomeLibWithJestService', () => {
  let service: MyAwesomeLibWithJestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAwesomeLibWithJestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
