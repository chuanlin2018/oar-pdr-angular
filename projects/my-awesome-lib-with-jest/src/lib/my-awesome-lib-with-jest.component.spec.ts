import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAwesomeLibWithJestComponent } from './my-awesome-lib-with-jest.component';
// import 'zone.js';
// import 'zone.js/dist/long-stack-trace-zone.js';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MyAwesomeLibWithJestComponent', () => {
  let component: MyAwesomeLibWithJestComponent;
  let fixture: ComponentFixture<MyAwesomeLibWithJestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAwesomeLibWithJestComponent ],
      imports: [NoopAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAwesomeLibWithJestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
