import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBasedTickerComponent } from './store-based-ticker.component';

describe('StoreBasedTickerComponent', () => {
  let component: StoreBasedTickerComponent;
  let fixture: ComponentFixture<StoreBasedTickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBasedTickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBasedTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
