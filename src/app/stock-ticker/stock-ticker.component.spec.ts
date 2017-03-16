import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTickerComponent } from './stock-ticker.component';

describe('StockTickerComponent', () => {
  let component: StockTickerComponent;
  let fixture: ComponentFixture<StockTickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
